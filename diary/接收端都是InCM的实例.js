var http = require('http'),
    url = require('url');
http.createServer(function(req, res) {
    res.end("IncomingMessage=" + (req instanceof http.IncomingMessage));
    //打印true
    console.log(req.url);
    console.log(req.headers);
    console.log(url.parse(req.url, true));
}).listen(1337);
//console.log(cres === sres);
/*
http封装了一个服务器http.Server和一个客户端http.request
http.Server是一个基于事件的http服务器，http.request则是一个http客户端工具，用于向http服务器发起请求。而上面的createServer方法中的参数函数中的两个参数req和res则是分别代表了请求对象和响应对象。其中req是http.IncomingMessage的实例，res是http.ServerResponse的实例
*/
