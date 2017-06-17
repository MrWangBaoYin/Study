var http = require('http');
http.createServer((req, res) => {
        if (req.url !== '/favicon.ico') {
            console.log(req.headers);
            res.on('close', function() { //当底层连接在 response.end() 被调用或能够刷新之前被终止时触发
                console.log('close', arguments);
            }).on('finish', function() { //
                console.log('finish', arguments);
            }); /*当响应头和响应主体的最后一部分已被交给操作系统通过网络进行传输时，触发该事件。 这并不意味着客户端已接收到任何东西。该事件触发后，响应对象上不再触发其他事件。*/
            res.writeHead(200, { 'content-type': 'text/html; charset = utf-8' });
            res.end('hello world');
        }
    }). //通常的一次连接会触发request和connection事件
on('connection', function( /*socket*/ ) {
    console.log('connection' /*, arguments*/ ); //socket 也可以通过 request.connection 访问。
}).
on('close', function() { //同tcp的close事件,不会再接受新的请求,但会保持当前存在的连接,等待所有的连接都断开后,会触发该事件
    console.log('close', arguments);
}).
on('checkContinue', function(req, res) { //同客户端的continue相对应,在请求头中包含expect:'100-continue'之后触发
    console.log('checkContinue' /*, arguments*/ );
    res.writeContinue(); //发送一个 HTTP/1.1 100 Continue 消息到客户端，表示请求主体可以开始发送。
    //res.end();
}).
on('connect', function() { ////提供代理服务器服务 看proxy.js
    console.log('connect', arguments);
}).
on('upgrade', function( /*res socket head*/ ) {
    console.log('upgrade', arguments);
}).
on('clientError', function( /*error socket*/ ) {
    console.log('clientError', arguments);
}).listen(3000, function() {
    console.log('listen 3000', arguments);
});
