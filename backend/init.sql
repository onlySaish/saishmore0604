-- Drop tables if they exist
DROP TABLE IF EXISTS volunteers;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS users;

-- Create Tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), -- optional, depends on your requirements
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    userRole VARCHAR(50) DEFAULT 'user' -- 'admin' or 'user'
);

CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    amount_received DECIMAL(10, 2) DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    campaign_id INT REFERENCES campaigns(id) ON DELETE CASCADE
);

BEGIN;
-- Insert default admin
INSERT INTO users (name, email, password, userRole) 
VALUES ('Admin', 'Admin123@admin.com', 'Admin@123', 'admin');

COMMIT;
-- Display contents of users table
-- SELECT * FROM users;  
-- SELECT * FROM volunteers;
-- SELECT * FROM campaigns;
