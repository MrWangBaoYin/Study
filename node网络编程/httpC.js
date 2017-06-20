var http = require('http');

var options = {
    path: '/index.html',
    hostname: 'localhost',
    port: 3000,
    //method: 'connect',
    headers: {
        //connection: 'keep-alive',
        //expect: '100-continue'
        range: '30-50'
    }
};

var req = http.request(options, function(res) {
        console.log(res.headers['content-length']);
        //console.log(arguments);
        res.on('data', chunk => {
            console.log(chunk.toString());
        });
    }). //通常的一次连接会触发socket response事件
on('socket', function() {
    console.log('socket' /*, arguments*/ );
}).
on('connect', function() {
    console.log('connect', arguments);
}).
on('upgrade', function() {
    console.log('upgrade', arguments);
}).
on('continue', function() {
    console.log('continue', arguments);

}).
on('error', function() {
    console.log('error', arguments);
});
req.end();
/*req.abort(); //标记请求为终止。 调用该方法将使响应中剩余的数据被丢弃且 socket 被销毁。
console.log(req.aborted); //如果请求已被终止，则该属性的值为请求被终止的时间，从 1 January 1970 00:00:00 UTC 到现在的毫秒数。*/
