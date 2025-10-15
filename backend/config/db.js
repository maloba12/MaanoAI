const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'maano_ai',
  password: process.env.DB_PASS,  // Note: Using DB_PASS to match your .env
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('⚠️  PostgreSQL connection failed:', err.message);
    console.log('💡 This is normal if the database is not set up yet.');
    console.log('   You can still use the app with simulated responses.');
  } else {
    console.log('✅ Connected to PostgreSQL database');
  }
});

module.exports = pool;