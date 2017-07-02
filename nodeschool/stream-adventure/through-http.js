var http = require('http');
var through = require('through2');

http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(through(function(buf, _, next) {
            this.push(buf.toString().toUpperCase());
            next();
        })).pipe(res);
    } else {
        res.end('hello ');
    }
}).listen(parseInt(process.argv[2]));
