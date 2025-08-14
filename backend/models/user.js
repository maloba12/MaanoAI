// For simplicity, using plain SQL queries. You can later move to ORM like Sequelize.
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  findByEmail: async (email) => {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      return result.rows;
    } catch (error) {
      console.log('⚠️  Database query failed:', error.message);
      // Return empty array for now - in production you'd want proper error handling
      return [];
    }
  },

  comparePassword: async (inputPassword, hash) => {
    try {
      return await bcrypt.compare(inputPassword, hash);
    } catch (error) {
      console.error('Password comparison error:', error);
      return false;
    }
  },

  // For development/testing - create a user if none exist
  createDefaultUser: async () => {
    try {
      const checkQuery = 'SELECT COUNT(*) FROM users';
      const result = await db.query(checkQuery);
      const userCount = parseInt(result.rows[0].count);
      
      if (userCount === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const insertQuery = `
          INSERT INTO users (email, password_hash, role, name, created_at) 
          VALUES ($1, $2, $3, $4, NOW())
        `;
        await db.query(insertQuery, ['admin@maano.ai', hashedPassword, 'admin', 'Admin User']);
        console.log('✅ Created default admin user: admin@maano.ai / admin123');
      }
    } catch (error) {
      console.log('⚠️  Could not create default user (database may not be set up):', error.message);
    }
  }
};

module.exports = User;
