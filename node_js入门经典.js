//入门      感觉好乱..先换本书
/*node.js介绍
*/
/*在核心上说,node.js是个事件驱动的服务器端的JavaScript环境*/
var test = (function () {//启动测试程序
    var all = [], num = 1, i, target, b;
    b = '一一一一一一一一一一一';
    b = b + b + b;
    target = function (str) {
        var number, a, result;
        number = num >= 10 ? num.toString() : '0' + num;
        a = '第' + number + '次测试: ' + str + ' ';
        result = a + b.slice(a.length);
        console.log(result);
        all.push(result);
        num = num + 1;
    };
    target.printAll = function () {
        for (i = 0; i < all.length; i = i + 1) {
            console.log(all[i]);
        }
    }

    return target;
}());
test("创建网页服务器 ");
var http = require('http');
http.createServer(function (rep, res) {
    res.writeHead(200, { 'content-type': 'text/plain'});
/*node.js时运行在V8引擎之上,是由Google开发的开源JavaScript引擎(BSD协议).且精于创建高并发的联网应用程序*/
/*创始人:Ryan Dahl*/
/*npm node package manager包管理器*/
/*npm install -g cnpm --registry=https://registry.npm.taobao.org*/
    test('包的使用 ');//为什么会打印两次?
    var _ = require('underscore');
    _.each([1,2,3,4],(a)=>res.write('underscore.js says '+a+'\n'));//为什么会换行?
/*http://blago.dachev.com/modules
http://nipstr.com/
寻找最流行的模块*/
/*npm search 搜索模块根据名字 关键词 多个关键词之间用空格隔开*/
/*全局安装会安装原文件到node安装包的lib目录下的node_moudles 程序包会放到bin中.本地安装会安装原文件到一个node安装包同级的node_moudles文件夹中*/
/*npm edit moudle查看安装模块的源码*/
/*package.json来指定应用程序中所依赖的模块 直接在一个模块文件夹内,npm install就会根据对应的package.json文件安装依赖*/
/*最简单的package.json*/
var package_json={
    "name": "node_js入门经典",
    "version": "0.0.1",
    "dependencies": {
        "underscore": "~1.8.1"
    }
};
/*什么是模块:模块是可重用的代码库*/

    res.end('\n...rswby');
})/*.listen(8000)*/;//a需要浏览器端验证时取消这里的注释
test('显示网络交互的不稳定性 ');
var http = require('http'),url = ['taobao.com','baidu.com','liaoxuefeng.com'];
var fetchPage = function (url) {
    var start = new Date();
    http.get({host: url},function () {
        console.log('Got response form '+url);
        console.log("Require took ",new Date() - start,'ms');
    });
}
var i;
for(i = 0; i < url.length; i++){
    fetchPage(url[i]);
}
/*事件驱动编程是处理不可预测性的极佳方式*/
/*回调:回调指的是将一个函数作为参数传递给另一个函数,并且在那个函数完成后被调用*/
