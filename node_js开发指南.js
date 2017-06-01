var first = new Date();
var queue = function (news){
    console.log(news, "time is", new Date() - first, 'ms');
}
var test = (function () {
    var all = [];
    var num = 1;
    var b = '一一一一一一一一一一一';
    b = b + b + b;
    var target = function (str) {
        var number = num >= 10? num.toString(): '0' + num;
        var a = '第' + number + '次测试: ' + str + ' ';
        var result = a + b.slice(a.length);
        console.log(result);
        all.push(result);
        num++;
    };
    target.printAll = function () {
        for (var i = 0; i < all.length; i++){
            console.log(all[i]);
        }
    }
    return target;
}());
//在JavaScript中函数好像都是异步的?
test("单线程异步的机制 ");
var http = require('http'),url = ['taobao.com','baidu.com','liaoxuefeng.com'];
var start = new Date();
var fetchPage = function (url) {
    var start = new Date();
    http.get({host: url}, function () {
        console.log('Got response form '+url);
        console.log("Require took ", new Date() - start, 'ms');
    });
}
var i;
for(i = 0; i < url.length; i++){
    fetchPage(url[i]);
}
console.log('解释器翻译到这一步所花费的时间是:', new Date() - start, 'ms');
test("单线程异步和多线程阻塞的区别 ");
//从上到下依次为每个函数调用分配内存去处理,对每条语句直接处理.......??,js中的单线程同时处理多件事情是如何实现的??
/*网上找的答案

多线程虽然也能解决高并发，但是是以建立多个线程来实现，其缺点是当遇到耗时的IO操作时，当前线程会被阻塞，并且把cpu的控制权交给其他线程，这样带来的问题就是要非常频繁的进行线程的上下文切换。*/
/*node.js的异步机制是基于事件的,所有的磁盘I/O,网络通信,数据库查询<所花费时间相比CPU时钟擦了好几个数量级>都以非阻塞的方式请求<应该是分类好的,而不是由程序自己判断是不是堵塞了>,返回的结果由事件循环来处理.node.js同一时刻只会处理一件事,<完成代码中的所有非阻塞部分>完成后立即进入事件循环并处理后面的事件.*/
/*node.js遇到上面的堵塞操作时,不会等待结果返回,而是直接执行后面的语句,直至进入事件循环.当阻塞结果返回时,会将事件发送到事件队列,等线程进入事件循环以后,才会调用之前的回调函数继续执行后面的逻辑*/
/*虽然不不信书会走弯路,但也比信书走了弯路而不知道好*/
//按理来说打印顺序完全应该按照花费时间从小到大排列,为什么不是呢,事件队列的机制又是什么??
/*node.js不怕低速连接攻击*/
/*node.js使用libev和libeio库支持事件驱动和异步式I/O*/
/*调试工具 supervisor*/
/*阻塞与线程
阻塞:线程在执行中如果遇到磁盘读写或网络通信(统称为I/O操作),通常要耗费较长的时间,这时操作系统会剥夺这个线程CPU的控制权,使其暂停执行,同时将资源然给其他工作线程,这种线程的调度方式称之为阻塞.
当I/O操作完成时,支操作系统将这个线程的阻塞状态解除,恢复其对CPU的控制权,令其继续执行.这种I/O模式就是通常的同步式I/O或阻塞式I/O.

异步式I/O或非阻塞式I/O则针对所有的I/O操作不采取阻塞策略.
当线程遇到I/O操作时,不会以阻塞的方式等待I/O操作的完成或数据的返回,而只是将I/O请求发送给操作系统,继续执行下一条语句,当操作系统完成I/O操作时,以事件的形式通知执行I/O操作的线程,线程会在特定的时间处理这个事件.
为了处理异步I/O,线程必须有事件循环,不断的检查有没有未处理的事件,依次予以处理.
在非阻塞模式下,这个线程永远在执行计算操作,这个线程所使用的CPU核心利用率永远是100%*/

/*单线程事件驱动的异步式I/O比传统的多线程阻塞式I/O好在:少了多线程的开销.*/
/*多线程开销:分配内存,列入调度,在线程切换时执行内存换页,CPU缓存被清空,切换回来时还要从新重内存中读取信息,破坏了数据的据局部性*/
test('异步读写文件 ');
var fs = require('fs');
fs.readFile('a.html', 'utf-8', function (err,data) {
    if(err){
        console.log('error');
    }
    else{
        console.log(data);
    }
});
console.log('end');
test('同步读写文件 ');
var data = fs.readFileSync('a.html','utf-8');
console.log(data);
console.log('end');
/*异步测试起来感觉难度会很高啊*/

test("事件发射器 ");
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();//构造函数
event.on('some_event', function () {//event对象注册some_event事件的监听器.
    queue('event');
    console.log('some_event occur');
});
event.on('some_event', function () {
    queue('event');
    console.log('依次调用');
})
setTimeout(function () {
    event.emit('some_event');//向event对象发送some_event事件.
},1000);
test("事件循环");
/*node.js的事件循环机制
node.js程序由事件循环开始,到事件循环结束,所有的逻辑都是事件的回调函数,所以node.js始终在事件循环中,程序的入口就是事件循环第一个事件的回调函数.
事件的回调函数在执行过程中,可能会发出I/O请求或直接发射(emit)事件,执行完毕后再返回事件循环,事件循环会检查事件队列中有没有未处理的事件,直到程序结束*/

/*node.js中没有显示的事件循环,对开发者不可见,又libev库实现.libev支持多种事件类型,如ev_io,ev_timer,ev_signal,ev_idle等,在node.js中都被EventEmitter封装.libev事件循环的每一次迭代,在node.js中就是一次Tick,libev不断的检查是否有活动的,可供检测的事件监听器,知道检测不到时才退出事件循环,进程结束*/

test('模块和包 ');
/*模块和包是node.js的重要支柱,开发一定规模的程序,需要把各个功能拆分,封装,然后组合起来,模块是为了实现这种方式而诞生的*/
/*一个js文件就是一个模块 httpnode.js核心模块,内部由C++实现,外部用JavaScript封装,用require函数获取这个模块,然后才可以使用其中的对象*/

/*exports是模块公开的接口,require用于在外部获取一个模块的接口*/
/*把需要提供的接口添加到exports对象上,就可以在外部被使用*/
/*require核心模块不会重复加载模块*/
/*exports本身仅仅是一个普通的空对象,没有任何特殊的地方,可以用其他来代替(用来声明接口)*/
/*用exports模块就是一个闭包对象,exports就是返回的操作接口*/
/*不可以通过对exports直接赋值代替对module.exports的赋值,exports实际上只是一个和module.exports只想同一个对象的变量,它会在模块执行结束后释放,但module不会,因此只能通过module.exports来改变访问接口*/
/*就是在返回多个的时候exports.???和module.exports.??都是可以的,但是module.exports可以直接等于一个对象而使整个模块只返回一个对象,更加简化*/
/*test("引入包");
var package = require('./package');
package.hello();
*/

/*模块与文件是一一对应的,文件不仅可以使JavaScript代码或二进制文件,还可以是个文件夹,其中默认的被引入的是index.js.*/
/*我们可以把文件夹封装为一个包,包通常是一些模块的集合,在模块基础上提高更高层的抽象*/
/*默认的引入文件通过对package.json中的main来确定,其他字段说明 name:包的名称 description:包的简要说明 version:版本 keywords:关键字数组,用于搜索 maintainers:维护者数组,包含name,email,web字段 contributors:贡献者数组,同上 bugs:提交bug的地址
licenses:许可证数组,包含type(许可证名称)url(链接到许可证文本的地址) repositories:仓库托管地址数组,每个元素包含type(仓库的类型)如git url(仓库的地址) path(仓库的路径 可选) dependencies:包的依赖   发布的时候直接对应文档一看就知道了*/

/*npm link moduleName 可以把全局包当做本地包使用 同时可以把本地包当做全局包使用 取消删除掉对应的软连接就好了*/

test("包管理器的常用命令 ");
/*在一个目录下 npm init根据交互式问答产生一个标准的package.json npm adduser获取一个维护自己包的账号 npm whoami验证是否已经取得账号 在目录中运行 npm publish 来发布包
在 http://search.npmjs.org寻找自己刚发布包  跟新包在package.json中改变version再使用npm publish就可以了
可以用 npm unpublish来取消发布*/

/*node debug name.js 启动调试工具调试文件 原来JavaScript还用调试啊*/
/*node install -g node-inspector 用这个工具可以图形化调试在浏览器端   目前完全感觉不到调试的必要 直接输出中间结果就够了*/

/*发现js文件在解析时所有内容都在一个匿名的立即调用闭包中,调试时发现*/

test("核心模块 ");
/*node核心模块*/
/*在JavaScript中浏览器端中的全局对象是window 在node.js中,全局对象是global,所有全局对象除了(global)以外,都是global对象的属性*/
test("全局对象 ");
a = 21;
function b (){
    console.log('nihao');
}
console.log(global.a);
console.log(global.b);
/*全局对象需要满足的条件1:在最外层定义(不可能满足,因为文件内容是在一个闭包函数中,没法在最外层定义)2:global本身自带的属性(这是当然的)3:隐士定义的对象(也就是前面没有加 var声明的变量)**所以永远要用var声明变量,避免污染全局变量*/
/*global下的process属性,提供了与操作系统的简单接口*/
/*process.argv是命令行参数的数组 第一个元素是node 第二个元素是文件名 后面是参数*/
test("命令行参数 ");//测试方式不直接在sublime中运行了,在终端运行 后面随便加参数看看效果就好
console.log(process.argv);
console.log(type(process.argv));
/*console.log('aaa')报错*/
console.log(b.a);//未定义
console.log(type.a);//未定义
function type(target){
    var a=Object.prototype.toString.call(target);
    return a;
}
/*process.stdout.write()用的是C语言中的write函数吗??*/
test("底层标准输出 ");
process.stdout.write("I'm base\n");
/*process.stdin标准输入流,感觉好熟悉,初始时是被暂停的,必须先恢复,而且不要忘记js是异步的,不要被原来的c同步所束缚*/
test("标准输入 ");
process.stdin.resume();//恢复
process.stdin.on('data', function (data){
    console.log('获取内容是', data.toString());
});//就是相当于C语言中使用了scanf一类的输入函数,不同的是不会堵塞,以后有时间看下底层实现的C代码
/*process.nextTick(callback)会在下次事件循环中调用callback*/
/*node适合I/O密集型应用,不适合计算密集型应用,应为只有一个线程,如果一个事件计算所花费的事件太多,下一事件就需要等待好久,函数可以实现吧许多计算任务分开,提高相应速度*/
/*setTimeout也是设置一个事件,不过效率很低*/
/*process.platform process.pid process.execPath process.memoryUsage()有等方法*/
/*console.log()可以像printf似得用多个参数 console.error()向标准错误流输出 console.trace()向标准错误流输出当前调用栈*/
test("输出栈信息 ");
console.trace();
/*util提供了常用函数的集合 util.inherits(A,B)就是继承,
A.prototype = b.prototype用不到,有更加清晰的继承方式
util.inspect(object,showHidden,depth,color)这个有用*/
test("调试功能 ");
debugger;
var util = require('util');
console.log(util.inspect(test,true));//设置颜色后在sublime中执行出现乱码
var a = new Error(".......");
console.log(type(a));
/*这个模块就一个有用的API,看下inspect的源码实现,自己实现一个也不是很难*/
test("事件模块 最重要的模块");
/*node本身本身构架是事件式的,events模块提供了唯一的接口,是最重要的模块,几乎被所有的模块所以依赖*/
/*只提供一个对象events.EventEmitter
EventEmitter的每个事件由一个事件名和若干个参数组成,事件名是一个字符串,有一定的语意,对于每个事件,EventEmitter支持若干个事件监听器.当事件发生时,注册到这个事件的监听器被依次调用,事件参数作为回调函数参数传递*/
/*EventEmitter.on(event, callbackListener)为事件注册一个监听器
EventEmitter.emit(event, arg1, arg2, arg3 ...)发射event件,向监听器的回调参数传参
EventEmitter.once(event, callbackListener)为制定指定事件注册一个单词监听器,只会触发一次,然后立即解除
EventEmitter.removeListener(event, callbackListener)移除指定事件的摸个监听器,必须注册过该监听器
EventEmitter.removeAllListeners([event]);指定事件移除指定事件的所有监听器,不指定移除所有的事件监听器*/

/*上面有实例*/
test("错误事件 ");
/*当程序发生异常时,会发射error事件,如果没有指定error事件的监听器,node.js会把它当做异常,退出程序,并打印调用栈,我们一般会设置error事件监听器,避免遇到错误后整个程序崩溃*/
var error = new EventEmitter();
error.on('error',function (er) {
    console.trace();
    console.log(er);
});
console.log(aaaaaaa);
test("第二次事件循环开始 ");
