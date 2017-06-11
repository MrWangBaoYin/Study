//每天都学的很碎,没法像前面似得可以来个专门的模块了,接下来用日记的方式来记录
console.log('关于request.url中中文字符的还原');

var http = require('http');

var server = new http.Server((req, res) => {
    if (req.url !== '/favicon.ico') { //有时会请求两次,有时请求一次,不知道是什么原因
        req.setEncoding('utf-8'); //没有res.setEncoding()在write end中第二个参数设置字符编码
        req.url = decodeURIComponent(req.url);
    } //可以还原编码后的中文字符对应的encodeURIComponent()可以对特殊字符进行编码
});
var a = encodeURIComponent('http://www.baidu.com/home/开始/?name=小明');
console.log(a);
console.log(decodeURIComponent(a));

console.log('request的请求方式在req.method属性中');
console.log('原来响应静态文件都是通过把异步直接缓存完整个文件,再把文件写入res中,现在发现了更好的方式');

function readFile(name, res) {
    name = '.' + name.pathname;
    if (fs.existsSync(name)) { //判断文件是否存在,注意不要落下s
        writeHead(name, res);
        fs.createReadStream(name).pipe(res); //直接通过文件流的方式,节约内存
    } else {
        res.writeHead(404, { 'content-type': 'text/html; charset = utf-8' });
        res.end('路径出错,没有找到对应的文件');
    }
}
console.log('响应头的自动填写');

function writeHead(filename, res) {
    var types = {
        '.css': 'text/css',
        '.gif': 'image/gif',
        '.html': 'text/html',
        '.ico': 'image/x - icon',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.svg': 'image/svg + xml',
        '.swf': 'application/x - shockwave - flash',
        '.tiff': 'image/tiff',
        '.txt': 'text/plain',
        '.wav': 'audio/x - wav',
        '.wma': 'audio/x - ms - wma',
        '.wmv': 'video/x - ms - wmv',
        '.xml': 'text/xml'
    }; //截取文件后缀,有点浪费
    var postfix = filename.slice(filename.indexOf('.'));
    /*postfix = require('path').extname(filename);*/
    contentType = types[postfix];
    console.log(contentType);
    res.writeHead(200, { 'content-type': contentType + '; charset = utf-8' });
}

console.log('url模块的常用方法');
var url = require('url');
var a = url.format({ //把对象转换为URL格式
    host: 'localhost:1234',
    pathname: '/home/a',
    port: 4321, //端口没法解析,需要写到host中
    query: {
        name: '大明',
        age: 23,
        address: '德州宁津'
    },
    protocol: 'http'
});
console.log(a);
console.log(url.parse(a)); //有三个参数,最后一个默认为false不知道干嘛用的
console.log(url.parse(a, true)); //第二个布尔参数作用是是否调用queryString来把query部分解析为对象
console.log('http.get传递数据的唯一方式是通过URL,因为函数结束后写入流已经关闭');
console.log('读取流的end事件对应写入流的end()参数都可以省略');
