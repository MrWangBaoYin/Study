"通过new http.Server()创建的服务器是通过监听request请求来回应数据的,记成监听data了记错了!";
var server = new http.Server();
server.on('request', (req, res) => {
    res.end('hello world');
    console.log('hello world');
});
"在想解决异步回调的方法了";
