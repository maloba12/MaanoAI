import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, setAuthToken, setUser, getUser } from '../services/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          
          if (response.success) {
            const { user, token } = response.data;
            
            // Store in localStorage
            setAuthToken(token);
            setUser(user);
            
            // Update store
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            return { success: true, user };
          } else {
            set({
              isLoading: false,
              error: response.error || 'Login failed'
            });
            return { success: false, error: response.error };
          }
        } catch (error) {
          const errorMessage = error.message || 'An error occurred during login';
          set({
            isLoading: false,
            error: errorMessage
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        // Clear localStorage
        authAPI.logout();
        
        // Clear store
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(userData);
          
          if (response.success) {
            set({ isLoading: false, error: null });
            return { success: true, message: response.message };
          } else {
            set({
              isLoading: false,
              error: response.error || 'Registration failed'
            });
            return { success: false, error: response.error };
          }
        } catch (error) {
          const errorMessage = error.message || 'An error occurred during registration';
          set({
            isLoading: false,
            error: errorMessage
          });
          return { success: false, error: errorMessage };
        }
      },

      refreshToken: async () => {
        try {
          const response = await authAPI.refresh();
          
          if (response.success) {
            const { token } = response.data;
            setAuthToken(token);
            set({ token, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
          return false;
        }
      },

      clearError: () => set({ error: null }),

      // Initialize from localStorage on app start
      initialize: () => {
        const storedUser = getUser();
        const storedToken = localStorage.getItem('maano_token');
        
        if (storedUser && storedToken) {
          set({
            user: storedUser,
            token: storedToken,
            isAuthenticated: true
          });
        }
      }
    }),
    {
      name: 'maano-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore; 