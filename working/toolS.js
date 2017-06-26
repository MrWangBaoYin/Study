var test = (function() {
    var all = [],
        num = 1,
        b = '__________________________',
        i;
    b = b + b;
    var target = function(str) {
        var number = num >= 10 ? num.toString() : '0' + num;
        var a = '第' + number + '次测试: ' + str + ' ';
        console.log(b);
        console.log('\n', a);
        all.push(a);
        num++;
    };
    target.printAll = function() {
        for (i = 0; i < all.length; i++) {
            console.log(all[i]);
        }
    };
    return target;
}());
exports.test = test;
exports.type = type;
exports.curry = curry;


function type(target) {
    return Object.prototype.toString.call(target);
}

function curry() { //函数套用
    Function.prototype.curry = function() {
        var slice = Array.prototype.slice,
            args = slice.call(arguments),
            that = this;
        return function() {
            that.apply(null, args.concat(slice.apply(arguments)));
        };
    };
}

//简易服务器模板


/*var querystring = require('querystring'),
    util = require('util'),
    url = require('url'),
    http = require('http'),
    tool = require('./toolS.js'),
    fs = require('fs');

var inspect = util.inspect;
var server = new http.Server((req, res) => {
    if (req.url !== '/favicon.ico') {
        // console.log(req, res);

        req.setEncoding('utf-8');
        req.url = decodeURIComponent(req.url);
        console.log(req.url);

        getData(req, res);
    }



});
server.listen(1234, () => console.log('listen 1234 port'));

function getData(req, res) {

    if (req.method === 'GET') {

        req.url = url.parse(req.url, true);
        console.log(req.url);
        readFile(req.url, res);
    } else if (req.method === 'POST') {
        var data = '';
        req.setEncoding('utf-8');
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            //data = querystring.parse(data);
            console.log(data);
            // console.log(inspect(req, 1, 0, 1));

            res.write('sucess');
            res.end('');
        });

    }
}



function readFile(name, res) {
    name = '.' + name.pathname;
    if (fs.existsSync(name)) {
        writeHead(name, res);
        fs.createReadStream(name).pipe(res);
    } else {
        res.writeHead(404, { 'content-type': 'text/html; charset = utf-8' });
        res.end('路径出错,没有找到对应的文件');
    }
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
    var path = require('path');
    var postfix = path.extname(name);
    var contentType = types[postfix];
    console.log(contentType);
    res.writeHead(200, { 'content-type': contentType + '; charset = utf-8' });


}
*/
