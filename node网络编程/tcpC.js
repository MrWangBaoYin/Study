var net = require('net');
//connect时createClient的别名
/*var client = net.connect(2000, 'localhost', function() {
    console.log('connect', arguments); //createConnection().on('connect',func)的简写
})*/
var client = net.createConnection(2000, 'localhost').
on('connect', function() { //只属于客户端的特殊事件
    console.log('connect', arguments);
}).
setEncoding('utf8').
on('data', data => { //对面发送数据到达时触发
    console.log('data', data);
}).
on('end', function() {
    console.log('end', arguments);
}).
on('drain', function() {
    console.log('drain', arguments); //当写入缓冲区变为空时发出。可以用来节流上传。???
}).
on('error', err => {
    console.log(err.message);
}).
on('close', function() {
    console.log('close', arguments); //
}).
on('timeout', function() {
    console.log('timeout', arguments); //当一段时间后连接不在活跃,该事件会被触发,来告诉用户连接已经被闲置
});
client.write('hello this is Client');
//client.end('客户端断开连接');
process.stdin.resume();
process.stdin.pipe(client);
