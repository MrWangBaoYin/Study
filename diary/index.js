var express = require('express'),
    app = express();
app.listen(3000);
var test = require('../Study/finished/test.js');
var addRoutes = require('./addRoutes.js');

test("中间件的行为");
/*
1:按顺序从上到下执行;
2:必须调用next(),request事件才会向下传递,否则停止在当前中间件中
3:next中如果有参数,则在客户端和服务端都打印,而且request事件终止
4:路由其实是中间件的封装,我现在是这样理解的
*/


app.use(function(req, res, next) {
    test("express 中间件参数");

    //console.log(arguments);
    console.log(req.res === res);
    console.log(res.req === req); //我去,有病啊!
    //console.log(arguments.length);
    console.log(req.url);
    arguments[2]();
}); //如果没有指定路径默认为'/',对get不适用
test('路由就是中间件的进一步封装 而且没有默认路径');
app.get('*' /*必须加,没有就不会被执行*/ , function() {
    console.log('我是get 我也是中间件');

    arguments[2]();
});
//结论,所有的get post use all都是中间件,只要运行next(),事件就会向后传递.
//而且,请求和回应是一个只读流和一个只写流

//只要没有像res写入内容,访问页面就会出现can't GET
test("浏览器对于相应数据的处理方式");
app.get('/', function() {
    arguments[1].write('ni hao a');
    arguments[2]();
}); //如果没有end,有write内容也不会显示在页面内,可以浏览器对于数据是先接受完毕,再解析,再显示的.
app.get('/', function() {
    arguments[1].end('没我不会显示的');
    arguments[2]();
});

//发现对http模块理解不够深刻,再继续深入学习http再来看express

/*
http 总结
1:http接口能够以流的形式处理数据
2:http的API是非常底层的,只涉及流的处理和消息的解析;把一个消息解析成消息头和消息主体,但不解析具体的消息头或消息主体(所谓的消息就是IncomingMessage)
3:接收到的原始消息头保存在rawHeaders属性中,是一个键值对数组(然后http会对其进行处理使其成为一个易于操作的对象);

*/
