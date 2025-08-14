const User = require('../models/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Try to find user in database
    const results = await User.findByEmail(email);
    
    if (results.length === 0) {
      // For development - allow login with demo credentials
      if (email === 'demo@maano.ai' && password === 'demo123') {
        return res.status(200).json({ 
          message: 'Login successful (demo mode)', 
          user: { 
            id: 'demo-1', 
            email: 'demo@maano.ai', 
            role: 'student',
            name: 'Demo Student'
          },
          token: 'demo-token-' + Date.now()
        });
      }
      
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await User.comparePassword(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ 
      message: 'Login successful', 
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name
      },
      token: 'jwt-token-' + Date.now() // TODO: Implement proper JWT
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
