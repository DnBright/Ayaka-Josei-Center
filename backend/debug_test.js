const http = require('http');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'debug_startup.log');
const log = (msg) => {
    const t = new Date().toISOString();
    fs.appendFileSync(logFile, `[${t}] ${msg}\n`);
};

log('--- STARTUP TEST INI MULAI JALAN ---');
log('Cwd: ' + process.cwd());
log('Filename: ' + __filename);
log('Node Version: ' + process.version);
log('Env PORT: ' + process.env.PORT);

const server = http.createServer((req, res) => {
    log('Request masuk ke: ' + req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('DIAGNOSTIC OK: Node is responding. URL: ' + req.url);
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    log('Server mendengarkan di port ' + PORT);
});
