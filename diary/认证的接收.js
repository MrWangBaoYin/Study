var http = require('http');

http.createServer((req, res) => {
    //console.log(req);
    //res.end('先寻找下验证');
    /*认证在req.headers.authorization*/
    var auth = req.headers.authorization;
    console.log(auth);
    var authCon = auth.split(' ')[1];
    var parsedAC = new Buffer(authCon, 'base64').toString('utf8');
    console.log(parsedAC);
    var aparsedAc = parsedAC.split(':');
    var user = aparsedAc[0];
    var pwd = aparsedAc[1];
    if (user === 'rswby' && pwd === 'nihaoa') {
        res.end('通过认证');
    } else {
        res.end('没有通过认证');
    }

}).listen(8888);
