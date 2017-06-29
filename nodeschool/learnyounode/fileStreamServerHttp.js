var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    fs.createReadStream(process.argv[3]).pipe(res);
}).listen(parseInt(process.argv[2]));
