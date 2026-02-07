const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./ayaka.db');

async function seed() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    db.serialize(() => {
        // Clear existing for fresh start if needed, or just insert IGNORE
        db.run("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)",
            ['superadmin', hashedPassword, 'superadmin']);

        console.log('Admin user seeded (Username: superadmin, Pass: admin123)');
    });
}

seed();
