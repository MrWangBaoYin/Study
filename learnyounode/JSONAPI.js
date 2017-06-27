var http = require('http');
var url = require('url');
http.createServer((req, res) => {
    req.url = url.parse(req.url, true);
    if (req.url.pathname.indexOf('/api') === 0) {
        res.writeHead(200, { 'content-type': 'application/json' });
    }

    if (req.url.pathname === '/api/parsetime') {
        let date = new Date(req.url.query.iso);
        res.end(JSON.stringify({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }));
    } else if (req.url.pathname === '/api/unixtime') {
        let date = new Date(req.url.query.iso);
        res.end(JSON.stringify({
            unixtime: date.getTime()
        }));
    } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('not found');
    }
}).listen(parseInt(process.argv[2]));
