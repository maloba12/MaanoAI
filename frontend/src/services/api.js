import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('maano_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('maano_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  refresh: () => api.post('/auth/refresh'),
  logout: () => {
    localStorage.removeItem('maano_token');
    localStorage.removeItem('maano_user');
  }
};

// Chat API calls
export const chatAPI = {
  // Get available AI models
  getModels: () => api.get('/chat/models'),
  
  // Single chat with specific model
  sendMessage: (message, modelId, contextId = null, options = {}) => 
    api.post('/chat/chat', { message, modelId, contextId, options }),
  
  // Compare multiple AI models
  compareModels: (message, models, options = {}) => 
    api.post('/chat/compare', { message, models, options }),
  
  // Get AI model recommendations
  getRecommendations: (prompt, subject = null) => 
    api.post('/chat/recommend', { prompt, subject }),
  
  // Get chat history
  getHistory: () => api.get('/chat/history'),
  
  // Export conversation
  exportConversation: (conversationId, format) => 
    api.post('/chat/export', { conversationId, format })
};

// User management API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.post('/user/profile', profileData),
  changePassword: (passwordData) => api.post('/user/password', passwordData)
};

// Organization/Admin API calls
export const orgAPI = {
  getPolicies: () => api.get('/org/policies'),
  updatePolicies: (policies) => api.put('/org/policies', policies),
  getAnalytics: (filters = {}) => api.get('/org/analytics', { params: filters })
};

// Utility functions
export const setAuthToken = (token) => {
  localStorage.setItem('maano_token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('maano_token');
};

export const setUser = (user) => {
  localStorage.setItem('maano_user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('maano_user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export default api; 