const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || 'ayaka_secret_key_2026';

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json({ limit: '50mb' }));

let db;

async function initDB() {
    try {
        const pool = await mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log('--- DEBUG DATABASE ---');
        console.log('DB_HOST:', process.env.DB_HOST);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_NAME:', process.env.DB_NAME);

        // CREATE TABLES
        await pool.query(`CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50) DEFAULT 'Member')`);
        await pool.query(`CREATE TABLE IF NOT EXISTS content (id INT AUTO_INCREMENT PRIMARY KEY, section_name VARCHAR(255) UNIQUE, content_data LONGTEXT, is_visible TINYINT(1) DEFAULT 1, sort_order INT DEFAULT 0)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), slug VARCHAR(255) UNIQUE, content LONGTEXT, image VARCHAR(255), category VARCHAR(50), author_id INT, status VARCHAR(20) DEFAULT 'draft', views INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS ebooks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, file_url VARCHAR(255), category VARCHAR(50), version VARCHAR(20), status VARCHAR(20) DEFAULT 'draft', views INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS analytics (id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50), item_id INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS site_stats (id INT AUTO_INCREMENT PRIMARY KEY, metric_name VARCHAR(255) UNIQUE, metric_value INT DEFAULT 0)`);

        // --- SEED ADMIN ---
        const [admins] = await pool.query('SELECT * FROM admins LIMIT 1');
        if (admins.length === 0) {
            const hashedPassword = await bcrypt.hash('password', 10);
            await pool.query("INSERT INTO admins (username, password, role) VALUES (?, ?, ?)", ['admin@gmail.com', hashedPassword, 'Super Admin']);
        }

        // --- FULL PRODUCTION DATA SEED ---
        const [contentRows] = await pool.query('SELECT * FROM content LIMIT 1');
        if (contentRows.length === 0) {
            console.log('MIGRATING FULL LOCAL DATA TO SERVER...');
            const dataPath = path.join(__dirname, 'full_content.json');
            if (fs.existsSync(dataPath)) {
                const rawData = fs.readFileSync(dataPath, 'utf8');
                const data = JSON.parse(rawData);
                
                for (const section in data) {
                    await pool.query("INSERT INTO content (section_name, content_data, is_visible, sort_order) VALUES (?, ?, 1, 0)", 
                        [section, JSON.stringify(data[section])]);
                }
                console.log('SUCCESS: Migration completed.');
            } else {
                console.error('ERROR: full_content.json not found at', dataPath);
            }
        }

        db = {
            query: async (sql, params) => {
                const [rows] = await pool.query(sql, params);
                return rows;
            }
        };
        console.log('SUCCESS: Connected to MySQL database.');
    } catch (err) {
        console.error('MySQL connection failed, check your .env:', err.message);
    }
}

initDB();

// API ROUTES
app.get(['/api/ping', '/ping'], (req, res) => res.send('AYAKA API IS ALIVE'));

app.get(['/api/content', '/content'], async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM content WHERE is_visible = 1");
        const keyedContent = rows.reduce((acc, row) => {
            try { acc[row.section_name] = JSON.parse(row.content_data); }
            catch (e) { acc[row.section_name] = row.content_data; }
            return acc;
        }, {});
        res.json(keyedContent);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get(['/api/posts', '/posts'], async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM posts WHERE status = 'publish' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get(['/api/ebooks', '/ebooks'], async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM ebooks WHERE status = 'publish' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post(['/api/auth/login', '/auth/login'], async (req, res) => {
    const { username, password } = req.body;
    try {
        const results = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
        if (results.length === 0) return res.status(401).json({ error: 'User not found' });
        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid password' });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);
        res.json({ token, role: user.role });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Backend Online on port ${PORT}.`));
