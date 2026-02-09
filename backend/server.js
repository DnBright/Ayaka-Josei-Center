const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || 'ayaka_secret_key_2026';

// LOGGING SYSTEM
const logFile = path.join(__dirname, 'login_debug.log');
const log = (msg) => {
    const time = new Date().toISOString();
    try {
        fs.appendFileSync(logFile, `[${time}] ${msg}\n`);
    } catch (e) { }
    console.log(`[${time}] ${msg}`);
};

app.use(cors());
app.use(express.json());

// Health Check
app.get('/ping', (req, res) => {
    log('Ping received');
    res.send('Ayaka Backend is Alive on Port ' + PORT);
});

// Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ayaka_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Table initialization is now handled by mysql_init.js or externally via phpMyAdmin
// This remains here for reference of the schema but we won't run it every time.

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: insufficient permissions' });
        }
        next();
    };
};

// --- BLOG / POSTS API ---
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts WHERE status = 'publish' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/posts', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    let query = `
        SELECT p.*, COALESCE(u.username, a.username) as author_name 
        FROM posts p 
        LEFT JOIN users u ON p.author_id = u.id AND p.author_source = 'users'
        LEFT JOIN admins a ON p.author_id = a.id AND p.author_source = 'admins'
    `;
    let params = [];

    if (req.user.role === 'Penulis') {
        query += " WHERE p.author_id = ? AND p.author_source = 'users'";
        params.push(req.user.id);
    }

    query += " ORDER BY p.created_at DESC";

    try {
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/posts', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    const { title, slug, excerpt, content, category, status, access_status, image } = req.body;
    const author_id = req.user.id;
    const author_source = req.user.source;

    const query = `INSERT INTO posts (title, slug, excerpt, content, category, author_id, author_source, status, access_status, image) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.execute(query, [title, slug, excerpt, content, category, author_id, author_source, status, access_status, image]);
        res.json({ id: result.insertId, message: 'Post created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/posts/:id', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    const { id } = req.params;
    const { title, slug, excerpt, content, category, status, access_status, image } = req.body;

    try {
        if (req.user.role === 'Penulis') {
            const [posts] = await pool.query("SELECT author_id, author_source FROM posts WHERE id = ?", [id]);
            if (posts.length === 0 || posts[0].author_id !== req.user.id || posts[0].author_source !== 'users') {
                return res.status(403).json({ error: 'Not authorized' });
            }
        }

        const query = `UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, status = ?, access_status = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        await pool.execute(query, [title, slug, excerpt, content, category, status, access_status, image, id]);
        res.json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- EBOOKS API ---
app.get('/api/ebooks', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM ebooks WHERE status = 'publish' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/ebooks', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    let query = `
        SELECT e.*, COALESCE(u.username, a.username) as author_name 
        FROM ebooks e 
        LEFT JOIN users u ON e.author_id = u.id AND e.author_source = 'users'
        LEFT JOIN admins a ON e.author_id = a.id AND e.author_source = 'admins'
    `;
    let params = [];

    if (req.user.role === 'Penulis') {
        query += " WHERE e.author_id = ? AND e.author_source = 'users'";
        params.push(req.user.id);
    }

    query += " ORDER BY e.created_at DESC";

    try {
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/ebooks', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    const { title, description, file_url, category, version, status } = req.body;
    const author_id = req.user.id;
    const author_source = req.user.source;

    try {
        const [result] = await pool.execute(
            `INSERT INTO ebooks (title, description, file_url, category, version, author_id, author_source, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, file_url, category, version, author_id, author_source, status]
        );
        res.json({ id: result.insertId, message: 'E-book created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- MEDIA API ---
app.get('/api/admin/media', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT m.*, u.username as uploader_name FROM media m JOIN users u ON m.uploaded_by = u.id ORDER BY m.created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/media', authenticateToken, authorizeRoles('Super Admin', 'Editor', 'Penulis'), async (req, res) => {
    const { filename, url, type } = req.body;
    const uploaded_by = req.user.id;

    try {
        const [result] = await pool.execute(`INSERT INTO media (filename, url, type, uploaded_by) VALUES (?, ?, ?, ?)`,
            [filename, url, type, uploaded_by]);
        res.json({ id: result.insertId, message: 'Media added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// --- CONTENT API ---
app.get('/api/content', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM content WHERE is_visible = 1 ORDER BY sort_order ASC");

        // Convert array of rows into a keyed object for frontend
        const keyedContent = rows.reduce((acc, row) => {
            try {
                acc[row.section_name] = JSON.parse(row.content_data);
            } catch (e) {
                acc[row.section_name] = row.content_data;
            }
            return acc;
        }, {});

        res.json(keyedContent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/content/:section', async (req, res) => {
    const { section } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM content WHERE section_name = ?", [section]);
        if (rows.length === 0) return res.status(404).json({ error: 'Section not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/content/:id', authenticateToken, authorizeRoles('Super Admin', 'Editor'), async (req, res) => {
    const { id } = req.params;
    const { content_data, is_visible, sort_order } = req.body;
    try {
        await pool.execute(
            "UPDATE content SET content_data = ?, is_visible = ?, sort_order = ? WHERE id = ?",
            [typeof content_data === 'string' ? content_data : JSON.stringify(content_data), is_visible, sort_order, id]
        );
        res.json({ message: 'Content updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/content', authenticateToken, authorizeRoles('Super Admin', 'Editor'), async (req, res) => {
    const { section_name, content_data, is_visible, sort_order } = req.body;
    try {
        await pool.execute(
            "INSERT INTO content (section_name, content_data, is_visible, sort_order) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), is_visible = VALUES(is_visible), sort_order = VALUES(sort_order)",
            [section_name, typeof content_data === 'string' ? content_data : JSON.stringify(content_data), is_visible, sort_order]
        );
        res.json({ message: 'Content saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- USER MANAGEMENT API ---
app.get('/api/admin/users', authenticateToken, authorizeRoles('Super Admin'), async (req, res) => {
    try {
        const [users] = await pool.query("SELECT id, username, role, 'users' as source FROM users");
        const [admins] = await pool.query("SELECT id, username, role, 'admins' as source FROM admins");
        res.json([...users, ...admins]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/users/:source/:id', authenticateToken, authorizeRoles('Super Admin'), async (req, res) => {
    const { source, id } = req.params;
    if (!['users', 'admins'].includes(source)) return res.status(400).json({ error: 'Invalid source' });

    try {
        await pool.execute(`DELETE FROM ${source} WHERE id = ?`, [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/users/:source/:id/role', authenticateToken, authorizeRoles('Super Admin'), async (req, res) => {
    const { source, id } = req.params;
    const { role } = req.body;

    // Logic to move between tables if role changes significantly?
    // For now, just update within the same table if role is compatible.
    // If a user becomes Admin, they should move.

    try {
        if (source === 'users' && ['Super Admin', 'Editor'].includes(role)) {
            // Move from users to admins
            const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

            const user = rows[0];
            await pool.execute("INSERT INTO admins (username, password, role) VALUES (?, ?, ?)", [user.username, user.password, role]);
            await pool.execute("DELETE FROM users WHERE id = ?", [id]);
            return res.json({ message: 'User promoted to admin and moved to admins table' });
        }

        if (source === 'admins' && ['Penulis', 'Member'].includes(role)) {
            // Demote from admins to users
            const [rows] = await pool.query("SELECT * FROM admins WHERE id = ?", [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Admin not found' });

            const admin = rows[0];
            await pool.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [admin.username, admin.password, role]);
            await pool.execute("DELETE FROM admins WHERE id = ?", [id]);
            return res.json({ message: 'Admin demoted and moved to users table' });
        }

        await pool.execute(`UPDATE ${source} SET role = ? WHERE id = ?`, [role, id]);
        res.json({ message: 'Role updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- ANALYTICS API ---
app.post('/api/analytics/track', async (req, res) => {
    const { type, id } = req.body; // type: 'visit', 'post', 'ebook'
    try {
        if (type === 'visit') {
            await pool.execute("UPDATE site_stats SET metric_value = metric_value + 1 WHERE metric_name = 'total_visits'");
        } else if (type === 'post' && id) {
            await pool.execute("UPDATE posts SET views = views + 1 WHERE id = ?", [id]);
        } else if (type === 'ebook' && id) {
            await pool.execute("UPDATE ebooks SET views = views + 1 WHERE id = ?", [id]);
        }
        res.json({ message: 'Tracking updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- COMMUNICATIONS / CONTACT API ---
app.get('/api/admin/communications', authenticateToken, authorizeRoles('Super Admin', 'Editor'), async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM communications ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/communications', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const [result] = await pool.execute(
            "INSERT INTO communications (name, email, subject, message, status) VALUES (?, ?, ?, ?, 'unread')",
            [name, email, subject, message]
        );
        res.json({ id: result.insertId, message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/communications/unread-count', authenticateToken, authorizeRoles('Super Admin', 'Editor'), async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT COUNT(*) as count FROM communications WHERE status = 'unread'");
        res.json({ count: rows[0].count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/admin/communications/:id/status', authenticateToken, authorizeRoles('Super Admin', 'Editor'), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await pool.execute("UPDATE communications SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: 'Status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/communications/:id', authenticateToken, authorizeRoles('Super Admin', 'Editor'), async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute("DELETE FROM communications WHERE id = ?", [id]);
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
    try {
        const { role, id } = req.user;
        log(`Stats request from User ID: ${id}, Role: ${role}`);
        let stats = {};

        if (role === 'Super Admin' || role === 'Editor') {
            log('Fetching global stats...');
            const [visits] = await pool.query("SELECT metric_value FROM site_stats WHERE metric_name = 'total_visits'");
            const [postViews] = await pool.query("SELECT SUM(views) as total FROM posts");
            const [ebookViews] = await pool.query("SELECT SUM(views) as total FROM ebooks");
            const [totalPosts] = await pool.query("SELECT COUNT(*) as count FROM posts");

            // Detailed Stats for Admin
            const [postDetails] = await pool.query("SELECT id, title, views, category, created_at FROM posts ORDER BY views DESC LIMIT 10");
            const [ebookDetails] = await pool.query("SELECT id, title, views, created_at FROM ebooks ORDER BY views DESC LIMIT 10");

            let totalMessages = 0;
            try {
                const [msgRows] = await pool.query("SELECT COUNT(*) as count FROM communications");
                totalMessages = msgRows[0]?.count || 0;
            } catch (e) { log(`Table communications missing or error: ${e.message}`); }

            stats = {
                totalVisits: visits[0]?.metric_value || 0,
                totalPostViews: postViews[0]?.total || 0,
                totalEbookViews: ebookViews[0]?.total || 0,
                totalPosts: totalPosts[0]?.count || 0,
                totalMessages: totalMessages,
                topPosts: postDetails,
                topEbooks: ebookDetails
            };
            log('Global stats successfully fetched.');
        } else if (role === 'Penulis') {
            log(`Fetching author stats for ID: ${id}...`);
            const [myPostViews] = await pool.query("SELECT SUM(views) as total FROM posts WHERE author_id = ?", [id]);
            const [myPosts] = await pool.query("SELECT COUNT(*) as count FROM posts WHERE author_id = ?", [id]);
            const [myEbooks] = await pool.query("SELECT COUNT(*) as count FROM ebooks WHERE author_id = ?", [id]);
            const [myEbookViews] = await pool.query("SELECT SUM(views) as total FROM ebooks WHERE author_id = ?", [id]);

            // Detailed Stats for Penulis
            const [myPostDetails] = await pool.query("SELECT id, title, views, category, created_at FROM posts WHERE author_id = ? ORDER BY views DESC", [id]);
            const [myEbookDetails] = await pool.query("SELECT id, title, views, created_at FROM ebooks WHERE author_id = ? ORDER BY views DESC", [id]);

            stats = {
                myPostViews: myPostViews[0]?.total || 0,
                myPosts: myPosts[0]?.count || 0,
                myEbooks: myEbooks[0]?.count || 0,
                myEbookViews: myEbookViews[0]?.total || 0,
                topPosts: myPostDetails,
                topEbooks: myEbookDetails
            };
            log('Author stats successfully fetched.');
        }

        res.json(stats);
    } catch (err) {
        log(`CRITICAL ERROR in /api/admin/stats: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password, source } = req.body;

    log(`Login attempt: "${username}" (Source: ${source || 'Any'})`);
    try {
        let query, params;

        if (source === 'admins') {
            query = "SELECT id, username, password, role, 'admins' as source FROM admins WHERE username = ?";
            params = [username];
        } else if (source === 'users') {
            query = "SELECT id, username, password, role, 'users' as source FROM users WHERE username = ?";
            params = [username];
        } else {
            // Priority: Admins first, then Users
            query = `
                SELECT id, username, password, role, 'admins' as source FROM admins WHERE username = ?
                UNION ALL
                SELECT id, username, password, role, 'users' as source FROM users WHERE username = ?
            `;
            params = [username, username];
        }

        const [results] = await pool.query(query, params);
        log(`Matches found: ${results.length}`);

        if (results.length === 0) return res.status(401).json({ error: 'User not found' });

        let matchedUser = null;
        for (const user of results) {
            log(`Checking user from ${user.source}, role: ${user.role}`);
            const valid = await bcrypt.compare(password, user.password);
            log(`Password valid: ${valid}`);
            if (valid) {
                matchedUser = user;
                break;
            }
        }

        if (!matchedUser) {
            log(`Login failed: No matching password found for any matched record.`);
            return res.status(401).json({ error: 'Invalid password' });
        }

        const user = matchedUser;

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role,
            source: user.source
        }, SECRET_KEY);

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    log(`Server running on http://0.0.0.0:${PORT} (MySQL Mode)`);
});

process.on('unhandledRejection', (reason, promise) => {
    log('Unhandled Rejection at: ' + promise + ' reason: ' + reason);
});

process.on('uncaughtException', (err) => {
    log('Uncaught Exception: ' + err.message);
    log(err.stack);
});
