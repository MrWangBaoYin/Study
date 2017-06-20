const http = require('http');
const net = require('net');
const url = require('url');

// 创建一个 HTTP 代理服务器
//官网代理服务器实例
const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});
proxy.on('connect', (req, s_cSocket, head) => {
    // 连接到一个服务器
    const srvUrl = url.parse(`http://${req.url}`);
    console.log(srvUrl);
    const s_tSocket = net.connect(srvUrl.port, srvUrl.hostname);
    s_cSocket.write('HTTP/1.1 200 Connection Established\r\n' +
        'Proxy-agent: Node.js-Proxy\r\n' + '\r\n');
    s_tSocket.write(head);
    s_tSocket.pipe(s_cSocket);
    s_cSocket.pipe(s_tSocket); //实现流的连接
}).on('error', err => {
    console.log(err);
});

// 代理服务器正在运行
proxy.listen(1337, '127.0.0.1', () => { //利用无参数回调函数处理客户端内容,实现服务器客户端在同一个文件中

    // 发送一个请求到代理服务器
    const options = {
        port: 1337,
        hostname: '127.0.0.1',
        method: 'CONNECT',
        path: 'www.hao123.com:80',
        headers: {
            encoding: null //解决服务器发送gzip格式的简单方法,但是第一次还会是gzip格式的,不知道为什么
        }
    };

    const req = http.request(options);
    req.end();

    req.on('connect', (res, socket, head) => {
        console.log('已连接！');
        console.log(head);
        // 通过代理服务器发送一个请求
        socket.write('GET / HTTP/1.1\r\n' +
            'Host: www.hao123.com:80\r\n' +
            'Connection: close\r\n' +
            '\r\n');

        socket.setEncoding('utf8');
        socket.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        socket.on('end', () => {

        });
        socket.on('error', err => {
            console.log(err);
        });


    }).on('error', err => {
        console.log(err);
    });
});
