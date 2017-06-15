//简易静态服务器的实现
var http = require('http'),
    fs = require('fs'),
    creatEL = require('./finished/creatEL.js'),
    url = require('url'),
    path = require('path'),
    zlib = require('zlib');

http.createServer((req, res) => {
    if (req.url !== '/favicon.ico') {
        req.url.replace(/\.\./g, '');
        req.url = url.parse(req.url, true);
        static(req, res); //静态文件服务器
    }
}).listen(3000);

var cacheControl = (function() { //缓存控制,对于图片视频等短期不会改动的文件利用客户端缓存
    var types = ['.jpg', '.jpeg', '.gif', '.pdf', '.png', '.tiff'];
    var maxAge = 60 * 60 * 24 * 365;
    return function(path, res) {
        if (types.some(profix => {
                return path.indexOf(profix) >= 0;
            })) {
            var date = new Date();
            date.setTime(date.getTime() + maxAge * 1000);
            res.setHeader('expires', date.toUTCString());
            res.setHeader('cache-control', 'max-age = ' + maxAge);
        }

    };

}());
var writeHead = (function() { //为不同文件设置不同响应头
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
    return function(name, res) {

        var postfix = path.extname(name);
        cacheControl(postfix, res);
        var contentType = types[postfix];
        contentType = contentType || 'text/plain';
        res.writeHead(200, { 'content-type': contentType + '; charset = utf-8' });
        //console.log(contentType);

    };

}());

var transferZip = (function() {
    var zip = ['.html', '.css', '.js', '.c', '.cpp', '.txt'];
    var zipMethod = {
        gzip: 'createGzip',
        deflate: 'createDeflate'
    };
    return function(path, res, method) {
        if (zip.some(profix => {
                var bool = path.indexOf(profix) >= 0;
                return bool;
            })) {
            res.setHeader('content-encoding', method);
            writeHead(path, res);
            fs.createReadStream(path).
            pipe(zlib[zipMethod[method]](path)).
            pipe(res);
        } else {
            writeHead(path, res);
            fs.createReadStream(path).pipe(res);
        }
    };
}());


function static(req, res) {
    var path = req.url.pathname.replace(/\//, '');
    console.log(req.headers);

    var el = creatEL();
    fs.stat(path, el.step(1));
    el.on('step1', stats => {
        var lastModified = new Date(stats.mtime).toUTCString();
        if (req.headers['if-modified-since'] === lastModified) {
            res.writeHead(304, 'not modified');
            res.end();
            console.log(req.headers);
            return; //if-modified-since的请求头，做日期检查，如果没有修改，则返回304。若修改，则返回文件
        }
        res.setHeader('Last-Modified', lastModified);
        if (req.headers['accept-encoding'].indexOf('gzip') >= 0) {
            transferZip(path, res, 'gzip');
        } else if (req.headers['accept-encoding'].indexOf('deflate') >= 0) {
            transferZip(path, res, 'deflate');
        } else {
            writeHead(path, res);
            fs.createReadStream(path).pipe(res);
        }
    }).on('error', err => {
        res.writeHead(404, { 'content-type': 'text/html; charset = utf-8' });
        res.end(err.message);
    });
}



/*为了简化问题，我们只做如下这几件事情：
为指定几种后缀的文件，在响应时添加Expires头和Cache-Control: max-age头。超时日期设置为1年。
由于这是静态文件服务器，为所有请求，响应时返回Last-Modified头。
为带If-Modified-Since的请求头，做日期检查，如果没有修改，则返回304。若修改，则返回文件。*/
