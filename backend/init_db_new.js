async function initDB() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 5
        });
        // Test connection
        await pool.query('SELECT 1');
        console.log('Using MySQL database.');

        // --- AUTO MIGRATION (MySQL) ---
        await pool.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS content (id INT AUTO_INCREMENT PRIMARY KEY, section_name VARCHAR(255) UNIQUE, content_data LONGTEXT, is_visible BOOLEAN DEFAULT 1, sort_order INT DEFAULT 0)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            title VARCHAR(255), 
            slug VARCHAR(255) UNIQUE, 
            excerpt TEXT,
            content LONGTEXT, 
            category VARCHAR(100),
            author_id INT,
            author_source VARCHAR(50) DEFAULT 'admins',
            image TEXT, 
            status VARCHAR(50) DEFAULT 'draft', 
            access_status VARCHAR(50) DEFAULT 'public',
            views INT DEFAULT 0, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);
        await pool.query(`CREATE TABLE IF NOT EXISTS ebooks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, file_url TEXT, category VARCHAR(100), version VARCHAR(50) DEFAULT 'v1.0', status VARCHAR(50) DEFAULT 'draft', author_id INT, author_source VARCHAR(50), views INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS media (id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255), url TEXT, type VARCHAR(50), uploaded_by INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`CREATE TABLE IF NOT EXISTS communications (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), subject VARCHAR(255), message TEXT, status VARCHAR(50) DEFAULT 'unread', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
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
            db = { query: async () => [], run: async () => {} };
        }
    }
}
