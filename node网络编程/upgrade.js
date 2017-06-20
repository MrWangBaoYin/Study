const http = require('http');

// 创建一个 HTTP 服务器,也是官网的实例,学到通过回调函数讲服务器和客户端写在同一个文件中
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});
server.on('upgrade', (req, socket, head) => {
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
        'Upgrade: WebSocket\r\n' +
        'Connection: Upgrade\r\n' +
        '\r\n');

    socket.pipe(socket);
});

// 服务器正在运行
server.listen(1337, '127.0.0.1', () => {

    // 发送一个请求
    const options = {
        port: 1337,
        hostname: '127.0.0.1',
        headers: {
            'Connection': 'Upgrade',
            'Upgrade': 'websocket'
        }
    };

    const req = http.request(options);
    req.end();

    req.on('upgrade', function(res, socket, upgradeHead /*这是个什么东西*/ ) {
        console.log('got upgraded!');
        console.log();
        socket.end(); //断开连接
        process.exit(0);
    });
});
