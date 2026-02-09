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

// Function to delete post
const deletePost = (postId) => {
    const options = {
        hostname: '127.0.0.1',
        port: 5005,
        path: `/api/admin/posts/${postId}`,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(`[DELETE Post ${postId}] Status Code: ${res.statusCode}`);
            console.log('Response:', data);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
};

// Test by trying to delete post ID 6 (the one we tested updating earlier)
deletePost(6);
