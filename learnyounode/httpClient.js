var http = require('http');

http.get(process.argv[2], res => {
    res.setEncoding('utf8').
    on('data', console.log).
    on('error', console.error);
}).on('error', console.error);
