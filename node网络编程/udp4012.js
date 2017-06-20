var dgram = require('dgram');
//udp不是面向连接的,没有流,是一个封装了数据包函数功能的EventEmitter。
var udp = dgram.createSocket('udp4').
on('message', (data, info) => {
    console.log(data.toString(), info);
}).
on('error', err => {
    console.log(err.message);
}).
on('listening', function() {
    console.log('listening', arguments);
}).
on('close', function() {
    console.log('close', arguments); //调用udp.close时触发,而且不再触发message事件,想要再次接收数据需要udp.bind
});
//udp.bind绑定一个接口用于接手数据 udp.close关闭bind udp.send发送数据
udp.bind(4012, 'localhost', function() {
    console.log('正在监听4012端口', arguments);
});
var data = new Buffer('不好');
udp.send(data, /*offset*/ 0, /*bufferLength*/ data.length, 2104, 'localhost', function() {
    console.log('数据发送', arguments);
}); //除了data port 其他都是可选的
