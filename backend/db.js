const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',  // Set the host to localhost
    database: process.env.DB_NAME || 'ngo-db',
    password: process.env.DB_PASSWORD || 'vit@123',
    port: process.env.DB_PORT || 5432,
});

const initializeDatabase = async () => {
    const sqlFilePath = path.join(__dirname, 'init.sql');
    const sqlQueries = fs.readFileSync(sqlFilePath).toString();
    
    try {
      await pool.query(sqlQueries);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };
  
  initializeDatabase(); 
module.exports = pool;
