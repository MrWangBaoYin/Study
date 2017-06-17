var net = require('net');

net.createServer(socket => { //客户端连接到时触发connection事件
    socket.setEncoding('utf8').
    on('data', data => { //对面发送数据到达时触发
        console.log('data', data);
        //socket.end('服务端断开连接'); //只接收一次数据断开连接
    }).
    on('end', function() {
        console.log('end', arguments); //当连接中任意一端发送了FIN数据时,触发该事件
    }).
    on('drain', function() {
        console.log('drain', arguments); //当写入缓冲区变为空时发出。可以用来节流上传。???
    }).
    on('error', err => {
        console.log(err.message);
    }).
    on('close', function() { //当套接字完全关闭时,触发该事件
        console.log('close', arguments); //
    }).
    on('timeout', function() {
        console.log('timeout', arguments); //当一段时间后连接不在活跃,该事件会被触发,来告诉用户连接已经被闲置
    }).write('hello this is Server');
    process.stdin.resume();
    process.stdin.pipe(socket); //标准输入作为socket的输入,实现一下简单的消息通信


}).
on('error', err => {
    console.log(err.message);
}).
on('close', () => { //调用server.close后服务器停止接受新套接字连接,但会保持当前存在的连接,等待所有的连接都断开后,会触发该事件
    console.log('Server Close');
}).
on('conection', function() { //createServer时触发
    console.log('conection', arguments);
}).
on('listening', function() { //listen时触发
    console.log('listening', arguments);
}).listen(2000, '127.0.0.1', err => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('socket listen sucess');
    }
});
