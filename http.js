//简易静态服务器的实现
var http = require('http'),
    fs = require('fs'),
    creatEL = require('./finished/creatEL.js'),
    url = require('url'),
    path = require('path');

http.createServer((req, res) => {
    if (req.url !== '/favicon.ico') {
        req.url.replace(/\.\./g, '');
        req.url = url.parse(req.url, true);
        static(req, res);
    }
}).listen(3000);

function static(req, res) {
    var path = req.url.pathname.replace(/\//, '');
    fs.readFile(path, function(err, data) {
        if (err) {
            res.writeHead(404, { 'content-type': 'text/html; charset = utf-8' });
            res.end('Not Have Such File');
        } else {

            writeHead(path, res);
            res.end(data);
        }
    });
}

function writeHead(name, res) {
    var types = {
        '.css': 'text/css',
        '.gif': 'image/gif',
        '.html': 'text/html',
        '.ico': 'image/x - icon',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.svg': 'image/svg + xml',
        '.swf': 'application/x - shockwave - flash',
        '.tiff': 'image/tiff',
        '.txt': 'text/plain',
        '.wav': 'audio/x - wav',
        '.wma': 'audio/x - ms - wma',
        '.wmv': 'video/x - ms - wmv',
        '.xml': 'text/xml'
    };
    var postfix = path.extname(name);
    var contentType = types[postfix];
    //console.log(contentType);
    res.writeHead(200, { 'content-type': contentType + '; charset = utf-8' });


}
