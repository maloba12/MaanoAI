const User = require('../models/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Development demo login (bypass database)
    if (email === 'admin@maano.ai' && password === 'admin123') {
      return res.json({ 
        success: true,
        data: { 
          user: { 
            id: 'admin-1', 
            email: 'admin@maano.ai', 
            role: 'admin',
            name: 'Admin User'
          },
          token: 'dev-token-' + Date.now()
        }
      });
    }

    // Original login logic (will work once DB is set up)
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Rest of your original login code...
    const results = await User.findByEmail(email);
    // ... (keep the rest of your original code)

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

// Export the login function
module.exports = { login };