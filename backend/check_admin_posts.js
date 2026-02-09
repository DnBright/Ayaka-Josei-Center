const http = require('http');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const SECRET_KEY = process.env.JWT_SECRET || 'ayaka_secret_key_2026';

// 1. Generate Super Admin Token
const token = jwt.sign({
    id: 1,
    username: 'ganang',
    role: 'Super Admin',
    source: 'admins'
}, SECRET_KEY);

console.log('Using Token:', token.substring(0, 15) + '...');

// 2. Make Request
const options = {
    hostname: '127.0.0.1',
    port: 5005,
    path: '/api/admin/posts',
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const posts = JSON.parse(data);
            console.log(`Total Posts: ${posts.length}`);

            const testPost = posts.find(p => p.title.includes('Test Artikel') || p.author_source === 'users');

            if (testPost) {
                console.log('✅ FOUND POST FROM AUTHOR:');
                console.log(JSON.stringify(testPost, null, 2));
            } else {
                console.log('❌ NO POSTS FROM AUTHORS FOUND.');
                console.log('Sample of first 3 posts:', JSON.stringify(posts.slice(0, 3), null, 2));
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw Data:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
