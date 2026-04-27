const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function fixSchema() {
    console.log('Starting DB schema fix...');
    
    const config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'ayaka_db'
    };

    let connection;
    try {
        connection = await mysql.createConnection(config);
        console.log('Connected to MySQL.');

        // 1. Fix 'posts' table columns
        console.log('Checking "posts" table columns...');
        const [columns] = await connection.query('SHOW COLUMNS FROM posts');
        const columnNames = columns.map(c => c.Field);

        const columnsToAdd = [
            { name: 'excerpt', type: 'TEXT' },
            { name: 'category', type: 'VARCHAR(100)' },
            { name: 'author_id', type: 'INT' },
            { name: 'author_source', type: "VARCHAR(50) DEFAULT 'admins'" },
            { name: 'access_status', type: "VARCHAR(50) DEFAULT 'public'" },
            { name: 'updated_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' }
        ];

        for (const col of columnsToAdd) {
            if (!columnNames.includes(col.name)) {
                console.log(`Adding column "${col.name}" to "posts" table...`);
                await connection.query(`ALTER TABLE posts ADD COLUMN ${col.name} ${col.type}`);
            } else {
                console.log(`Column "${col.name}" already exists.`);
            }
        }

        // 2. Create 'communications' table if missing
        console.log('Checking "communications" table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS communications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                subject VARCHAR(255),
                message TEXT,
                status VARCHAR(50) DEFAULT 'unread',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('"communications" table checked/created.');

        // 3. Ensure 'media' table exists (referenced in server.js)
        console.log('Checking "media" table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS media (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255),
                url TEXT,
                type VARCHAR(50),
                uploaded_by INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('"media" table checked/created.');

        console.log('DB schema fix completed successfully.');
    } catch (err) {
        console.error('Error fixing DB schema:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

fixSchema();
