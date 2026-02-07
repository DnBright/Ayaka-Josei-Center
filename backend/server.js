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

                // Default Sections to match the 9-section structure
                const sections = [
                    ['home', JSON.stringify({
                        title: 'AYAKA JOSEI CENTER',
                        subtitle: 'Lembaga Pelatihan Kerja Jepang Spesialis Putri',
                        description: 'Memberdayakan perempuan Indonesia melalui pelatihan profesional dan penempatan kerja aman di Jepang.',
                        buttonText: 'Pelajari Selengkapnya',
                        isVisible: true
                    })],
                    ['profil', JSON.stringify({
                        title: 'Profil Perusahaan',
                        tagline: 'Membangun Karir, Meraih Masa Depan',
                        text: 'Ayaka Josei Center hadir sebagai jembatan bagi putri Indonesia untuk meraih impian berkarir di Jepang. Fokus kami adalah pendampingan intensif mulai dari bahasa, budaya, hingga kesiapan fisik dan mental.',
                        objective: 'Menjadi partner terpercaya dalam penempatan tenaga kerja perempuan yang kompeten dan bermartabat.',
                        isVisible: true
                    })],
                    ['program', JSON.stringify({
                        title: 'Program & Peluang Kerja',
                        items: [
                            { name: 'Nursing Care (Kaigo)', desc: 'Pendampingan lansia di fasilitas modern Jepang. Bidang paling stabil dengan prospek karir panjang.' },
                            { name: 'Food & Beverage', desc: 'Pengolahan makanan dan pelayanan restoran dengan standar kebersihan dan keramahan Jepang.' },
                            { name: 'Industri Manufaktur', desc: 'Kesempatan bekerja di lini produksi industri terkemuka dengan teknologi mutakhir.' },
                            { name: 'Hospitality', desc: 'Layanan perhotelan dan pariwisata untuk Anda yang senang berinteraksi secara internasional.' }
                        ],
                        isVisible: true
                    })],
                    ['manfaat', JSON.stringify({
                        title: 'Manfaat Mengikuti Program',
                        items: [
                            { title: 'Penghasilan Standar Jepang', desc: 'Gaji kompetitif yang memungkinkan Anda untuk menabung dan membantu keluarga.' },
                            { title: 'Fasilitas & Asuransi', desc: 'Jaminan kesehatan, asuransi kecelakaan kerja, dan tempat tinggal yang layak.' },
                            { title: 'Pengalaman Global', desc: 'Membangun etos kerja dan kemandirian di salah satu negara termahal di dunia.' },
                            { title: 'Cuti & Waktu Istirahat', desc: 'Sistem kerja yang teratur dengan hak cuti tahunan sesuai regulasi Jepang.' }
                        ],
                        isVisible: true
                    })],
                    ['alur', JSON.stringify({
                        title: 'Alur Program Kami',
                        steps: [
                            { title: 'Pendaftaran', desc: 'Seleksi berkas dan administrasi awal.' },
                            { title: 'Pelatihan', desc: 'Belajar bahasa Jepang (N4/N3) dan skill teknis.' },
                            { title: 'Seleksi User', desc: 'Wawancara langsung dengan perusahaan dari Jepang.' },
                            { title: 'Pemberangkatan', desc: 'Pengurusan visa dan keberangkatan ke Jepang.' },
                            { title: 'Pendampingan', desc: 'Kami tetap memantau kondisi Anda selama di Jepang.' }
                        ],
                        isVisible: true
                    })],
                    ['alumni', JSON.stringify({
                        title: 'Alumni & Cerita Sukses',
                        items: [
                            { name: 'Siti Aminah', quote: 'Sangat terbantu sejak pendaftaran hingga terbang ke Tokyo. Sekarang saya bekerja di fasilitas lansia Prefektur Chiba.' },
                            { name: 'Lani Wijaya', quote: 'Materi pelatihannya sangat relevan. Saya merasa lebih siap menghadapi budaya kerja Jepang yang disiplin.' }
                        ],
                        isVisible: true
                    })],
                    ['blog', JSON.stringify({
                        title: 'Informasi & Edukasi',
                        posts: [
                            { title: 'Pentingnya Sertifikat JLPT untuk Karir', date: '2026-02-07' },
                            { title: 'Mengenal Budaya Omotenashi di Jepang', date: '2026-02-06' },
                            { title: 'Langkah Awal Menabung untuk Kerja ke Jepang', date: '2026-02-05' }
                        ],
                        isVisible: true
                    })],
                    ['cta', JSON.stringify({
                        title: 'Siap Memulai Langkah Anda?',
                        subtitle: 'Dapatkan konsultasi gratis dan bimbingan langsung dari tim ahli kami.',
                        buttonPrimary: 'Daftar Sekarang',
                        buttonSecondary: 'Konsultasi WhatsApp',
                        isVisible: true
                    })],
                    ['kontak', JSON.stringify({
                        email: 'admin@ayakajoseicenter.com',
                        phone: '+62 812 3456 789',
                        address: 'Jl. Pemuda No. 123, Jakarta Timur',
                        legal: 'PT Ayaka Global Indonesia • Izin SO No. 123/2026',
                        isVisible: true
                    })]
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
