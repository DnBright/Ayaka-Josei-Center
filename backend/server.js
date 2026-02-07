const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || 'ayaka_secret_key_2026';

app.use(cors());
app.use(express.json());

// Database Initialization
const db = new sqlite3.Database('./ayaka.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the Ayaka database.');
});

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                role TEXT
            )`);

            // Content Table
            db.run(`CREATE TABLE IF NOT EXISTS content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                section_name TEXT UNIQUE,
                content_data TEXT,
                is_visible INTEGER DEFAULT 1,
                sort_order INTEGER DEFAULT 0
            )`, (err) => {
                if (err) return reject(err);

                // Default Sections to match Navbar labels
                const sections = [
                    ['home', JSON.stringify({ title: 'AYAKA JOSEI CENTER', subtitle: 'Lembaga Pelatihan Kerja Jepang Spesialis Putri', buttonText: 'Pelajari Selengkapnya' })],
                    ['profil', JSON.stringify({ title: 'Profil Perusahaan', text: 'Ayaka Josei Center adalah LPK Jepang yang berdedikasi membantu putri Indonesia berkarir profesional di Jepang.' })],
                    ['program', JSON.stringify({ title: 'Program SO Ayaka Josei Center', items: [] })],
                    ['galeri', JSON.stringify({ title: 'Galeri Kegiatan', items: [] })],
                    ['blog', JSON.stringify({ title: 'Berita & Blog', posts: [] })],
                    ['alumni', JSON.stringify({ title: 'Alumni & Testimoni', items: [] })],
                    ['kontak', JSON.stringify({ email: 'info@ayakajoseicenter.com', phone: '+628123456789', address: 'Jakarta, Indonesia' })]
                ];

                const stmt = db.prepare("INSERT OR IGNORE INTO content (section_name, content_data) VALUES (?, ?)");
                sections.forEach(s => stmt.run(s));
                stmt.finalize();
                resolve();
            });
        });
    });
};

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

// Routes
app.get('/api/content', (req, res) => {
    db.all("SELECT * FROM content ORDER BY sort_order ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const data = {};
        rows.forEach(row => {
            data[row.section_name] = JSON.parse(row.content_data);
            data[row.section_name].isVisible = row.is_visible;
        });
        res.json(data);
    });
});

app.put('/api/content/:section', authenticateToken, (req, res) => {
    const { section } = req.params;
    const { content_data, is_visible, sort_order } = req.body;

    db.run(`UPDATE content SET content_data = ?, is_visible = ?, sort_order = ? WHERE section_name = ?`,
        [JSON.stringify(content_data), is_visible, sort_order, section],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Content updated successfully' });
        }
    );
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);
        res.json({ token, role: user.role });
    });
});

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
