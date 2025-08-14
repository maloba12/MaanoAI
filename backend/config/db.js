const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/maano_ai',
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
