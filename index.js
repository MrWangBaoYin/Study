var express = require('express'),
    app = express();
app.listen(3000);

var addRoutes = require('./addRoutes.js');
//addRoutes(app);
//console.log("经过路由后直接就没了,在只有路由和静态文件的情况,谁在前面执行谁,而且执行之后就结束了,哪怕路由中没有end,依然不会调用后面的内容");
app.use(express.static('../Study/'));
//1:请求目录是"/"时,在没有下面中间件的时候,显示Can't GET,在有的时候下面执行了.

app.use(function(req, res, next) {
    console.log('the', req.method, 'arrived');
    //next('试下');
    next();
}); //调用next来确定是request事件是否在向后传递,如果next有参数,则会打印参数内容,切不会向后传递!
app.use('/', function(req, res, next) {
    res.end('我试试能不能截下来');
    next();
}); //路径匹配的中间件调用next()后,request事件依然会向后传递
/*app.use(function(req, res, next) {
    console.log('我执行了没有?');
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('hellow world');
    next(); //调用next()方法,哪怕已经res.end()了,request事件依然会向后传递;
});*/

app.use(function(req, res, next) {
    console.log('试下我会执行不');
    next();
});
console.log("结论:不会向后传递request事件的只有路由和express.static中间件(因为是自带的,没法给他添加next()调用),也就是说,没有next()调用就不会向后传递request事件,而且路由啊中间件啊都是从上到下按顺序执行的");

app.all('*', function(req, res, next) {
    console.log('听说所有的请求都必须通过我,我试试看能不能被拦截'); //在后面依然被截下来了;
    next();
}); //这个all指的是get post put delete等所有的http.method都会通过这个请求;
/*试下看看app.get有没有next参数*/

app.get("*", function(req, res, next) {
    console.log('你好啊');
    next(); //看会不会报错
});

app.get('*', function(req, res, next) {
    console.log('我执行了吗');
    next();
});
//尼玛,所有的都是中间件,我....,
console.log('结论:所有的都是中间件,all是use的别名,next的结论同上,其他的get post都是在原始中间件的基础上增加的限制条件')

function viewF(arg) {
    var inspect = require('util').inspect;
    var slice = Array.prototype.slice;
    for (var i = 0; i < arg.length; i++) {
        console.log(inspect(arg[i], slice.call(arguments, 1)));
    }
}


app.use(function() {
    console.log('我来瞧瞧中间件的参数到底怎么回事');
    viewF(arguments, 1, 1, 1);
});

//以后碰到不是自己写的函数先来一下
