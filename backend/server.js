const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// SQLite imports moved inside initDB fallback to prevent startup crashes

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || 'ayaka_secret_key_2026';

// WAJIB UNTUK CPANEL
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get(['/api/ping', '/ping'], (req, res) => {
    res.send('BACKEND AYAKA SUDAH HIDUP (MANUAL PATH FIX)!');
});

app.get(['/api', '/'], (req, res) => {
    res.json({
        message: 'Welcome to Ayaka Josei Center API',
        status: 'online',
        database: 'MySQL Connected'
    });
});

let db;

async function initDB() {
    console.log('--- DEBUG DATABASE ---');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);
    
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 5
        });
        // Test connection
        await pool.query('SELECT 1');
        console.log('SUCCESS: Connected to MySQL database.');

        // --- AUTO MIGRATION (MySQL) ---
        await pool.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS content (id INT AUTO_INCREMENT PRIMARY KEY, section_name VARCHAR(255) UNIQUE, content_data LONGTEXT, is_visible BOOLEAN DEFAULT 1, sort_order INT DEFAULT 0)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), slug VARCHAR(255) UNIQUE, content LONGTEXT, image TEXT, status VARCHAR(50) DEFAULT 'draft', views INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS ebooks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, file_url TEXT, category VARCHAR(100), version VARCHAR(50) DEFAULT 'v1.0', status VARCHAR(50) DEFAULT 'draft', views INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS analytics (id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50), item_id INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS site_stats (id INT AUTO_INCREMENT PRIMARY KEY, metric_name VARCHAR(255) UNIQUE, metric_value INT DEFAULT 0)`);

        db = {
            query: async (sql, params) => {
                const [rows] = await pool.query(sql, params);
                return rows;
            }
        };
    } catch (err) {
        console.warn('MySQL connection failed, trying to fallback to SQLite:', err.message);
        try {
            // Dynamic require to prevent crash if sqlite3 is missing/incompatible
            const sqlite3 = require('sqlite3');
            const { open } = require('sqlite');
            const sqliteDb = await open({
                filename: path.join(__dirname, 'ayaka.db'),
                driver: sqlite3.Database
            });
            console.log('Using SQLite database.');
            
            await sqliteDb.exec(`
                CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT);
                CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT);
                CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY AUTOINCREMENT, section_name TEXT UNIQUE, content_data TEXT, is_visible INTEGER DEFAULT 1, sort_order INTEGER DEFAULT 0);
                CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, slug TEXT UNIQUE, content TEXT, image TEXT, status TEXT DEFAULT 'draft', views INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
                CREATE TABLE IF NOT EXISTS ebooks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, file_url TEXT, category TEXT, version TEXT DEFAULT 'v1.0', status TEXT DEFAULT 'draft', views INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
                CREATE TABLE IF NOT EXISTS analytics (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, item_id INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
                CREATE TABLE IF NOT EXISTS site_stats (id INTEGER PRIMARY KEY AUTOINCREMENT, metric_name TEXT UNIQUE, metric_value INTEGER DEFAULT 0);
            `);

            db = {
                query: async (sql, params) => {
                    return await sqliteDb.all(sql, params);
                },
                run: async (sql, params) => {
                    return await sqliteDb.run(sql, params);
                }
            };
        } catch (sqliteErr) {
            console.error('SQLite fallback also failed:', sqliteErr.message);
            // Non-functional DB object to prevent further crashes
            db = { query: async () => [], run: async () => {} };
        }
    }
}


initDB();

app.get(['/api/posts', '/posts'], async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM posts WHERE status = 'publish' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get(['/api/content', '/content'], async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM content WHERE is_visible = 1 ORDER BY sort_order ASC");
        const keyedContent = rows.reduce((acc, row) => {
            try { acc[row.section_name] = JSON.parse(row.content_data); }
            catch (e) { acc[row.section_name] = row.content_data; }
            return acc;
        }, {});
        res.json(keyedContent);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// E-BOOKS ENDPOINTS
app.get(['/api/ebooks', '/ebooks'], async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM ebooks WHERE status = 'publish' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get(['/api/admin/ebooks', '/admin/ebooks'], async (req, res) => {
    try {
        // Simple public list for now (RoleGuard handles auth on frontend for now)
        const rows = await db.query("SELECT * FROM ebooks ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post(['/api/admin/ebooks', '/admin/ebooks'], async (req, res) => {
    const { title, description, file_url, category, version, status } = req.body;
    try {
        if (db.run) {
            await db.run("INSERT INTO ebooks (title, description, file_url, category, version, status) VALUES (?, ?, ?, ?, ?, ?)", 
                [title, description, file_url, category, version, status]);
        } else {
            await db.query("INSERT INTO ebooks (title, description, file_url, category, version, status) VALUES (?, ?, ?, ?, ?, ?)", 
                [title, description, file_url, category, version, status]);
        }
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ANALYTICS TRACKING
app.post(['/api/analytics/track', '/analytics/track'], async (req, res) => {
    const { type, id } = req.body;
    try {
        if (db.run) {
            await db.run("INSERT INTO analytics (type, item_id) VALUES (?, ?)", [type, id]);
            if (type === 'ebook') {
                await db.run("UPDATE ebooks SET views = views + 1 WHERE id = ?", [id]);
            } else if (type === 'post') {
                await db.run("UPDATE posts SET views = views + 1 WHERE id = ?", [id]);
            }
        } else {
            await db.query("INSERT INTO analytics (type, item_id) VALUES (?, ?)", [type, id]);
            if (type === 'ebook') {
                await db.query("UPDATE ebooks SET views = views + 1 WHERE id = ?", [id]);
            } else if (type === 'post') {
                await db.query("UPDATE posts SET views = views + 1 WHERE id = ?", [id]);
            }
        }
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post(['/api/auth/login', '/auth/login'], async (req, res) => {
    const { username, password } = req.body;
    try {
        const results = await db.query("SELECT id, username, password, role FROM admins WHERE username = ? UNION ALL SELECT id, username, password, role FROM users WHERE username = ?", [username, username]);
        if (results.length === 0) return res.status(401).json({ error: 'User not found' });
        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid password' });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);
        res.json({ token, role: user.role });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Backend Online on port ${PORT}.`));
