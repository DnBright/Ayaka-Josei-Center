const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log('Starting migration...');

        // 1. Add views to posts
        const [postsCols] = await connection.query('SHOW COLUMNS FROM posts LIKE "views"');
        if (postsCols.length === 0) {
            await connection.query('ALTER TABLE posts ADD COLUMN views INT DEFAULT 0 AFTER image');
            console.log('Added "views" column to "posts" table.');
        }

        // 2. Add views to ebooks
        const [ebooksCols] = await connection.query('SHOW COLUMNS FROM ebooks LIKE "views"');
        if (ebooksCols.length === 0) {
            await connection.query('ALTER TABLE ebooks ADD COLUMN views INT DEFAULT 0 AFTER status');
            console.log('Added "views" column to "ebooks" table.');
        }

        // 3. Create site_stats table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS site_stats (
                id INT AUTO_INCREMENT PRIMARY KEY,
                metric_name VARCHAR(100) UNIQUE,
                metric_value INT DEFAULT 0,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('Verified "site_stats" table.');

        // 4. Initialize total_visits
        await connection.query(`
            INSERT IGNORE INTO site_stats (metric_name, metric_value) 
            VALUES ('total_visits', 0)
        `);
        console.log('Initialized "total_visits" in "site_stats".');

        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await connection.end();
    }
}

migrate();
