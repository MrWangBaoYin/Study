var http = require('http');
var map = require('through2-map'); //看不懂源码

http.createServer((req, res) => {
    req.setEncoding('utf8');
    //这样之后并不会处理成字符串,而是会智能合并编码,不会出现多字节字符乱码的现象
    if (req.method !== 'POST') {
        res.end('Please send me by POST');
    }
    req.pipe(map(chunks => {
        return chunks.toString().toUpperCase();
    })).pipe(res);

}).listen(parseInt(process.argv[2]));
