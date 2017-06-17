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
        //console.log(req);
        console.log(req.headers);
        /*console.log(req.url);*/
        static(req, res); //静态文件服务器
    } else {
        res.end();
    }
}).
on('connection', function() {
    console.log('connection' /*, arguments*/ );
}).
on('close', function() { //同tcp的close事件,不会再接受新的请求,但会保持当前存在的连接,等待所有的连接都断开后,会触发该事件
    console.log('close', arguments);
}).
on('checkContinue', function() {
    console.log('checkContinue', arguments);
}).
on('connect', function() {
    console.log('connect', arguments);
}).
on('upgrade', function() {
    console.log('upgrade', arguments);
}).
on('clientError', function( /*error socket*/ ) {
    console.log('clientError', arguments);
}).
on('error', err => {
        console.log(err);
    })
    .listen(3000, 'localhost', function() {
        console.log('listen 3000', arguments);
    });

function static(req, res) { //因为有一个异步操作,所以可以在其它未定义变量之前
    var path = req.url.pathname.replace(/\//, '');
    //console.log(req.headers);

    var el = creatEL();
    fs.stat(path, el.step(1));
    el.on('step1', stats => {
        var lastModified = new Date(stats.mtime).toUTCString();
        /*if (req.headers['if-modified-since'] === lastModified) {
            res.writeHead(304, 'not modified');
            res.end();
            console.log(req.headers);
            return; //if-modified-since的请求头，做日期检查，如果没有修改，则返回304。若修改，则返回文件
        }*/
        res.setHeader('Last-Modified', lastModified);
        var range;
        if (req.headers.range) {
            range = dealHeadersRange(req, res, stats);
        } else {
            range = {};
        }
        /*在数据发送之前,检查是否有断线重连*/
        if (req.headers['accept-encoding']) {
            if (req.headers['accept-encoding'].indexOf('gzip') >= 0) {
                transferZip(path, res, 'gzip', range);
            } else if (req.headers['accept-encoding'].indexOf('deflate') >= 0) {
                transferZip(path, res, 'deflate', range);
            }
        } else {
            writeHead(path, res);
            fs.createReadStream(path, range).pipe(res);
        }
    }).on('error', err => {
        res.writeHead(404, { 'content-type': 'text/html; charset = utf-8' });
        res.end(err.message);
    });
}

function getRange(str, size) {
    if (str.indexOf(",") !== -1) {
        return {};
    }
    var range = str.split("-"),
        start = parseInt(range[0] && range[0].match(/\d+/)[0], 10),
        end = parseInt(range[1], 10);
    // Case: 100-
    if (isNaN(end)) {
        end = size - 1;
    }
    if (isNaN(start)) {
        start = size - end;
        end = size - 1;
    }
    // Invalid
    if (isNaN(start) || isNaN(end) || start > end || end > size) {
        return {};
    }
    return { start: start, end: end };
}

function dealHeadersRange(req, res, stats) {
    var range = getRange(req.headers.range, stats.size);
    if (range.start) {
        res.setHeader('content-range', 'bytes ' + range.start + '-' + range.end + '/' + stats.size);
        res.setHeader('content-length', (range.end - range.start + 1));
    } else {
        res.writeHead(416, "Request Range Not Satisfiable");
        res.end();
    }
    return range;
}


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
    return function(path, res, method, range) {
        if (zip.some(profix => {
                var bool = path.indexOf(profix) >= 0;
                return bool;
            })) {
            res.setHeader('content-encoding', method);
            writeHead(path, res);
            fs.createReadStream(path, range).
            pipe(zlib[zipMethod[method]](path)).
            pipe(res);
        } else {
            writeHead(path, res);
            fs.createReadStream(path, range).pipe(res);
        }
    };
}());





/*为了简化问题，我们只做如下这几件事情：
为指定几种后缀的文件，在响应时添加Expires头和Cache-Control: max-age头。超时日期设置为1年。
由于这是静态文件服务器，为所有请求，响应时返回Last-Modified头。
为带If-Modified-Since的请求头，做日期检查，如果没有修改，则返回304。若修改，则返回文件。*/
