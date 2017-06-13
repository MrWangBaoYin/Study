var http = require('http');

http.createServer((req, res) => {
    //console.log(req);
    //res.end('先寻找下验证');
    /*认证在req.headers.authorization*/
    var authCon = req.headers.authorization.split(' ')[1]; //Basic ...... 中间有一个空格,不知道Basic是干什么的
    var aparsedAc = new Buffer(authCon, 'base64').toString('utf8').split(':');
    //网上找的,不知道原理
    //console.log(aparsedAC);
    var user = aparsedAc[0];
    var pwd = aparsedAc[1];
    if (user === 'rswby' && pwd === 'nihaoa') {
        res.end('通过认证');
    } else {
        res.end('没有通过认证');
    }

}).listen(8888);
