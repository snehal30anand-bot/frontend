// --- Code on your Node.js Server ---
const db = require('./database_connection'); // Your database connection module

async function setupDatabase() {
    try {
        // 1. Create the database (if it doesn't exist)
        await db.query("CREATE DATABASE IF NOT EXISTS satellite_db;");
        console.log("Database 'satellite_db' ensured.");

        // 2. Switch to using the new database
        await db.query("USE satellite_db;");
        
        // 3. Create a table to store user data (including the HASHED password)
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table 'users' ensured and ready.");
    } catch (error) {
        console.error("Database setup failed:", error);
    }
}

setupDatabase(); // Run this function once when your server starts