var test = (function() {
    'use strict';
    var all = [],
        num = 1,
        b = '一一一一一一一一一一一',
        target;
    b = b + b + b;
    target = function(str) {
        var number = num >= 10 ? num.toString() : '0' + num,
            a = '第' + number + '次测试: ' + str + ' ',
            result = a + b.slice(a.length);
        console.log(result);
        all.push(result);
        num += 1;
    };
    target.printAll = function() {
        var i;
        for (i = 0; i < all.length; i += 1) {
            console.log(all[i]);
        }
    }
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
        }
    }
}

//简易服务器模板
var querystring = require('querystring'),
    util = require('util'),
    url = require('url'),
    http = require('http'),
    tool = require('./toolS.js'),
    fs = require('fs');

var inspect = util.inspect;
var server = new http.Server((req, res) => {
    if (req.url !== '/favicon.ico') {
        /*console.log(req, res);
         */
        getData(req, res);
    }



})
server.listen(3000, () => console.log('listen 3000 port'));

function getData(req, res) {
    var content;
    if (req.method === 'GET') {
        content = url.parse(req.url, true);
        var path = parsePath(content);
        readFile(path, res);
    } else if (req.method === 'POST') {
        var data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            data = querystring.parse(data);
            content = data;
            console.log(data.name);
        })

    }
}

function parsePath(content) {
    return content.path.replace(/\//, '');
}

function readFile(name, res) {
    console.log(name);
    fs.readFile(name, 'utf-8', (err, data) => {
        if (err) {
            res.end('Not Found');
        } else {
            res.writeHead(200, { 'content-type': 'text/html; charset = utf-8' });
            res.end(data);
        }
    })
}
