var first = new Date();
var queue = function (news){
    console.log(news, "time is", new Date() - first, 'ms');
}//用于测试异步事件
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
        queue('实际事件完成时间 '+url);
    });
}
var i;
for(i = 0; i < url.length; i++){
    fetchPage(url[i]);
}
console.log('解释器翻译到这一步所花费的时间是:', new Date() - start, 'ms');
test("单线程异步和多线程阻塞的区别 ");
//从上到下依次为每个函数调用分配内存去处理,对每条语句直接处理.......??,js中的单线程同时处理多件事情是如何实现的??  解决
/*网上找的答案

多线程虽然也能解决高并发，但是是以建立多个线程来实现，其缺点是当遇到耗时的IO操作时，当前线程会被阻塞，并且把cpu的控制权交给其他线程，这样带来的问题就是要非常频繁的进行线程的上下文切换。*/
/*node.js的异步机制是基于事件的,所有的磁盘I/O,网络通信,数据库查询<所花费时间相比CPU时钟擦了好几个数量级>都以非阻塞的方式请求<应该是分类好的,而不是由程序自己判断是不是堵塞了>,返回的结果由事件循环来处理.node.js同一时刻只会处理一件事,<完成代码中的所有非阻塞部分>完成后立即进入事件循环并处理后面的事件.*/
/*node.js遇到上面的堵塞操作时,不会等待结果返回,而是直接执行后面的语句,直至进入事件循环.当阻塞结果返回时,会将事件发送到事件队列,等线程进入事件循环以后,才会调用之前的回调函数继续执行后面的逻辑*/
/*虽然不不信书会走弯路,但也比信书走了弯路而error.on('error',function (er) {
    console.trace();
    console.log(er);

});不知道好*/
//按理来说打印顺序完全应该按照花费时间从小到大排列,为什么不是呢,事件队列的机制又是什么??  解决
/*node.js不怕低速连接攻击*/
/*node.js使用libev和libeio库支持事件驱动和异步式I/O*/

/*调试工具 supervisor 用于调试http服务器,在每次文件被改变时,都可以结束对应的脚本,再重新执行 需要全局安装,然后supervisor name.js就可以了*/

/*阻塞与线程
阻塞:线程在执行中如果遇到磁盘读写或网络通信(统称为I/O操作),通常要耗费较长的时间,这时操作系统会剥夺这个线程CPU的控制权,使其暂停执行,同时将资源然给其他工作线程,这种线程的调度方式称之为阻塞.
当I/O操作完成时,支操作系统将这个线程的阻塞状态解除,恢复其对CPU的控制权,令其继续执行.这种I/O模式就是通常的同步式I/O或阻塞式I/O.

异步式I/O或非阻塞式I/O则针对所有的I/O操作不采取阻塞策略.
当线程遇到I/O操作时,不会以阻塞的方式等待I/O操作的完成或数据的返回,而只是将I/O请求发送给操作系统,继续执行下一条语句,当操作系统完成I/O操作时,以事件的形式通知执行I/O操作的线程,error.on('error',function (er) {
    console.trace();
    console.log(er);

});线程会在特定的时间处理这个事件.
为了处理异步I/O,线程必须有事件循环,不断的检查有没有未处理的事件,依次予以处理.
在非阻塞模式下,这个线程永远在执行计算操作,这个线程所使用的CPU核心利用率永远是100%*/

/*单线程事件驱动的异步式I/O比传统的多线程阻塞式I/O好在:少了多线程的开销.*/
/*多线程开销:分配内存,列入调度,在线程切换时执行内存换页,CPU缓存被清空,切换回来时还要从新重内存中读取信息,破坏了数据的据局部性*/
/*同步式 I/O 和异步式 I/O 的特点
同步式 I/O(阻塞式)                            异步式 I/O(非阻塞式)
利用多线程提供吞吐量                           单线程即可实现高吞吐量
通过事件片分割和线程调度利用多核CPU              通过功能划分利用多核CPU
需要由操作系统调度多线程使用多核 CPU             可以将单进程绑定到单核 CPU
难以充分利用 CPU 资源                         可以充分利用 CPU 资源
内存轨迹大,数据局部性弱                        内存轨迹小,数据局部性强
符合线性的编程思维                             不符合传统编程思维
*/
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
event.emit('some_event');//向event对象发送some_event事件.

event.on('some_event', function () {
    queue('event');
    console.log('依次调用');
})

event.emit('some_event');//程序由事件循环开始，当事件监听触发时，会立即调用对应的回调函数，直接处于事件循环队列的最顶端
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
/*Node.js 在调用某个包时,会首先检查包中 package.json 文件的 main 字段,将其作为
包的接口模块,如果 package.json 或 main 字段不存在,会尝试寻找 index.js 或 index.node 作
为包的接口。
package.json 是 CommonJS 规定的用来描述包的文件,完全符合规范的 package.json 文
件应该含有以下字段。

name :包的名称,必须是唯一的,由小写英文字母、数字和下划线组成,不能包含
空格。

description :包的简要说明。

version :符合语义化版本识别 规范的版本字符串

keywords :关键字数组,通常用于搜索

maintainers :维护者数组,每个元素要包含 name 、 email (可选)
、 web (可选)字段

contributors :贡献者数组,格式与 maintainers 相同。包的作者应该是贡献者
数组的第一个元素

bugs :提交bug的地址,可以是网址或者电子邮件地址。


licenses :许可证数组,每个元素要包含 type (许可证的名称)和 url (链接到
许可证文本的地址)字段

repositories :仓库托管地址数组,每个元素要包含 type (仓库的类型,如 git )
,url (仓库的地址)和 path (相对于仓库的路径,可选)字段。

dependencies :包的依赖,一个关联数组,由包名称和版本号组成。
*/

/*npm link moduleName 可以把全局包当做本地包使用 同时可以把本地包当做全局包使用 取消删除掉对应的软连接就好了
可以用来查看任何源码  可以一直学下去*/

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
/*全局对象需要满足的条件1:在最外层定义(不可能满足,因为文件内容是在一个闭包函数中,没法在最外层定义)2:global本身自带的属性(这是当然的)3:隐式定义的对象(也就是前面没有加 var声明的变量)**所以永远要用var声明变量,避免污染全局变量*/
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

    console.log(type(data));
    console.log('获取内容是', data);
});//就是相当于C语言中使用了scanf一类的输入函数,不同的是不会堵塞,以后有时间看下底层实现的C代码
/*process.nextTick(callback)会在下次事件循环中调用callback*/
/*node适合I/O密集型应用,不适合计算密集型应用,应为只有一个线程,如果一个事件计算所花费的事件太多,下一事件就需要等待好久,函数可以实现把许多计算任务分开,提高相应速度*/
/*setTimeout也是设置一个事件,不过效率很低*/
/*process.platform process.pid process.execPath process.memoryUsage()有等方法*/
/*console.log()可以像printf似得用多个参数 console.error()向标准错误流输出 console.trace()向标准错误流输出当前调用栈*/
test("输出栈信息 ");
console.trace();
/*util提供了常用函数的集合 util.inherits(A,B)就是继承,
A.prototype = b.prototype用不到,有更加清晰的继承方式
module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
} util.inherists()实现源码

util.inspect(object,[showHidden],[depth],[colors]) 是一个将任意对象转换
为字符串的方法,通常用于调试和错误输出。它至少接受一个参数 object ,即要转换的对象。
showHidden 是一个可选参数,如果值为 true ,将会输出更多隐藏信息。
depth 表示最大递归的层数,如果对象很复杂,你可以指定层数以控制输出信息的多
少。如果不指定 depth ,默认会递归2层,指定为 null 表示将不限递归层数完整遍历对象。
如果 color 值为 true ,输出格式将会以 ANSI 颜色编码,通常用于在终端显示更漂亮
的效果。
特别要指出的是, util.inspect 并不会简单地直接把对象转换为字符串,即使该对
象定义了 toString 方法也不会调用。*/
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
/*on === addListener
EventEmitter.on(event, listener) 为指定事件注册一个监听器,接受一个字
符串 event 和一个回调函数 listener 。
EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件,
传递若干可选参数到事件监听器的参数表。如果事件有注册监听返回 true，否则返回
false.
EventEmitter.once(event, listener) 为指定事件注册一个单次监听器,即
监听器最多只会触发一次,触发后立刻解除该监听器。
EventEmitter.removeListener(event, listener) 移除指定事件的某个监听
器, listener 必须是该事件已经注册过的监听器。需要注意的是，此操作将会改变处
于被删监听器之后的那些监听器的索引。
EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器,
如果指定 event ,则移除指定事件的所有监听器。*/

/*上面有实例*/
test("错误事件 ");
/*EventEmitter 定义了一个特殊的事件 error ,它包含了“错误”的语义,我们在遇到
异常的时候通常会发射 error 事件。当 error 被发射时, EventEmitter 规定如果没有响
应的监听器, Node.js 会把它当作异常,退出程序并打印调用栈。我们一般要为会发射 error
事件的对象设置监听器,避免遇到错误后整个程序崩溃*/
var error = new EventEmitter();
error.on('error',function (er) {
    console.trace();
    queue(er);

});

error.emit('error','错误事件发射');
test("文件模块 ")
/*中括号括起来的表示可选参数*/
/*fs.readFile(filename,[encoding],[callback(err,data)]) 是最简单的读取
文件的函数。它接受一个必选参数 filename ,表示要读取的文件名。第二个参数 encoding
是可选的,表示文件的字符编码。 callback 是回调函数,用于接收文件的内容。如果不指
定 encoding ,则 callback 就是第二个参数。回调函数提供两个参数 err 和 data , err 表
示有没有错误发生, data 是文件内容。如果指定了 encoding , data 是一个解析后的字符
串,否则 data 将会是以 Buffer 形式表示的二进制数据。*/
/*fs.open(path, flags, [mode], [callback(err, fd)]) 是 POSIX open 函数的
封装,与 C 语言标准库中的 fopen 函数类似。它接受两个必选参数, path 为文件的路径,
flags 可以是以下值。
r :以读取模式打开文件。
r+:以读写模式打开文件。
w :以写入模式打开文件,如果文件不存在则创建。 w+ :以读写模式打开文件,如果文件不存在则创建。
a :以追加模式打开文件,如果文件不存在则创建。
a+:以读取追加模式打开文件,如果文件不存在则创建。
mode 参数用于创建文件时给文件指定权限,默认是 0666 。回调函数将会传递一个文
件描述符 fd。*/
/*fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,
buffer)]) 是 POSIX read 函数的封装,相比 fs.readFile 提供了更底层的接口。 fs.read
的功能是从指定的文件描述符 fd 中读取数据并写入 buffer 指向的缓冲区对象。 offset 是
buffer 的写入偏移量。 length 是要从文件中读取的字节数。 position 是文件读取的起始
位置,如果 position 的值为 null ,则会从当前文件指针的位置读取。回调函数传递
bytesRead 和 buffer ,分别表示读取的字节数和缓冲区对象。*/
/*
打开文件
fs.open(path,flags, [mode], [callback(err,fd)])
fs.openSync(path, flags, [mode])

关闭文件
fs.close(fd, [callback(err)])
fs.closeSync(fd)

读取文件
(文件描述符)
fs.read(fd,buffer,offset,length,position,[callback(err, bytesRead, buffer)])
fs.readSync(fd, buffer, offset,length, position)

写入文件
(文件描述符)
fs.write(fd,buffer,offset,length,position,[callback(err, bytesWritten, buffer)])
fs.writeSync(fd, buffer, offset,length, position)

读取文件内容
fs.readFile(filename,[encoding],[callback(err, data)])
fs.readFileSync(filename,[encoding])

写入文件内容
fs.writeFile(filename,[callback(err)])
fs.writeFileSync(filename, data,[encoding])

删除文件
fs.unlink(path, [callback(err)])

创建目录
fs.mkdir(path, [mode], [callback(err)])
fs.mkdirSync(path, [mode])

删除目录
fs.rmdir(path, [callback(err)])
fs.rmdirSync(path)

读取目录
fs.readdir(path, [callback(err, files)])
fs.readdirSync(path)

获取真实路径
fs.realpath(path, [callback(err,resolvedPath)])
fs.realpathSync(path)

更名
fs.rename(path1, path2, [callback(err)])
fs.renameSync(path1, path2)
截断
fs.truncate(fd, len, [callback(err)])
fs.truncateSync(fd, len)
更改所有权
fs.chown(path, uid, gid, [callback(err)])
fs.chownSync(path, uid, gid)
更改所有权(文件描述符)
fs.fchown(fd, uid, gid, [callback(err)])
fs.fchownSync(fd, uid, gid)
更改所有权(不解析符号链接)
fs.lchown(path, uid, gid, [callback(err)])
fs.lchownSync(path, uid, gid)

更改权限
fs.chmod(path, mode, [callback(err)])
fs.chmodSync(path, mode)
更改权限(文件描述符)
fs.fchmod(fd, mode, [callback(err)])
fs.fchmodSync(fd, mode)
更改权限(不解析符号链接)
fs.lchmod(path, mode, [callback(err)])
fs.lchmodSync(path, mode)

获取文件信息
fs.stat(path, [callback(err, stats)])
fs.statSync(path)
获取文件信息(文件描述符)
fs.fstat(fd, [callback(err, stats)])
fs.fstatSync(fd)
获取文件信息(不解析符号链接)
fs.lstat(path, [callback(err, stats)])
fs.lstatSync(path)

创建硬链接
fs.link(srcpath, dstpath, [callback(err)])
fs.linkSync(srcpath, dstpath)

创建符号链接
fs.symlink(linkdata, path, [type],[callback(err)])
fs.symlinkSync(linkdata, path,[type])

读取链接
fs.readlink(path, [callback(err,linkString)])
fs.readlinkSync(path)

修改文件时间戳
fs.utimes(path, atime, mtime, [callback(err)])
fs.utimesSync(path, atime, mtime)
修改文件时间戳(文件描述符)
fs.futimes(fd, atime, mtime, [callback(err)])
fs.futimesSync(fd, atime, mtime)

同步磁盘缓存
fs.fsync(fd, [callback(err)])
fs.fsyncSync(fd)*/
test("服务器 ");
/*Node.js 标准库提供了 http 模块,其中封装了一个高效的 HTTP 服务器和一个简易的
HTTP 客户端。 http.Server 是一个基于事件的 HTTP 服务器,它的核心由 Node.js 下层 C++
部分实现,而接口由 JavaScript 封装,兼顾了高性能与简易性。 http.request 则是一个
HTTP 客户端工具,用于向 HTTP 服务器发起请求*/
/*http.Server 是一个基于事件的 HTTP 服务器,所有的请求都被封装为独立的事件,
开发者只需要对它的事件编写响应函数即可实现 HTTP 服务器的所有功能。它继承自
EventEmitter ,提供了以下几个事件*/
/*
request :当客户端请求到来时,该事件被触发,提供两个参数 req 和 res ,分别是
http.ServerRequest 和 http.ServerResponse 的实例,表示请求和响应信息。

connection :当 TCP 连接建立时,该事件被触发,提供一个参数 socket ,为
net.Socket 的实例。 connection 事件的粒度要大于 request ,因为客户端在
Keep-Alive 模式下可能会在同一个连接内发送多次请求。

close :当服务器关闭时,该事件被触发。注意不是在用户连接断开时。

除此之外还有 checkContinue 、 upgrade 、 clientError 事件,通常我们不需要关
心,只有在实现复杂的 HTTP 服务器的时候才会用到*/
/*前面的实现是简便的方式 实际的行为是*/
var http = require('http')
,   url  = require('url')
,   util = require('util')
,   querystring = require('querystring');
;
var server = new http.Server();
server.on('request', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
    res.write(util.inspect(url.parse(req.url,true)));//获取Get请求,query Get内容,path 路径
    res.end('visited');
});
server.listen(3000);

test("第二次事件循环开始 ");
queue("第一次事件循环所花费的时间");
/*
HTTP 请求一般可以分为两部分:请求头(Request Header)和请求体(Requset Body)。
以上内容由于长度较短都可以在请求头解析完成后立即读取。而请求体可能相对较长,
需要一定的时间传输,因此 http.ServerRequest 提供了以下3个事件用于控制请求体
传输。
data :当请求体数据到来时,该事件被触发。该事件提供一个参数 chunk ,表示接
收到的数据。如果该事件没有被监听,那么请求体将会被抛弃。该事件可能会被调
用多次。
end :当请求体数据传输完成时,该事件被触发,此后将不会再有数据到来。
close : 用户当前请求结束时,该事件被触发。不同于 end ,如果用户强制终止了
传输,也还是调用 close 。
complete : 客户端请求是否已经发送完成
httpVersion : HTTP 协议版本,通常是 1.0 或 1.1
method : HTTP 请求方法,如 GET、POST、PUT、DELETE 等
url : 原始的请求路径,例如 /static/image/x.jpg 或 /user?name=byvoid
headers : HTTP 请求头
trailers : HTTP 请求尾(不常见)
connection : 当前 HTTP 连接套接字,为 net.Socket 的实例
socket : connection 属性的别名
client : client 属性的别名
*/
/* 获取post内容,但是实际中不会这样使用,效率低而且有安全问题
 var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function () {
        util.inspect(querystring.parse(post));
        res.end('');
    });*/
/*
http.ServerResponse 是返回给客户端的信息,决定了用户最终能看到的结果。它
也是由 http.Server 的 request 事件发送的,作为第二个参数传递,一般简称为
response 或 res 。
http.ServerResponse 有三个重要的成员函数,用于返回响应头、响应内容以及结束
请求。

response.writeHead(statusCode, [headers]) :向请求的客户端发送响应头。
statusCode 是 HTTP 状态码,如 200 (请求成功)
、404 (未找到)等。 headers
是一个类似关联数组的对象,表示响应头的每个属性。该函数在一个请求内最多只
能调用一次,如果不调用,则会自动生成一个响应头。

response.write(data, [encoding]) :向请求的客户端发送响应内容。 data 是
一个 Buffer 或字符串,表示要发送的内容。如果 data 是字符串,那么需要指定
encoding 来说明它的编码方式,默认是 utf-8 。在 response.end 调用之前,
response.write 可以被多次调用。

response.end([data], [encoding]) :结束响应,告知客户端所有发送已经完
成。当所有要返回的内容发送完毕的时候,该函数 必须 被调用一次。它接受两个可
选参数,意义和 response.write 相同。如果不调用该函数,客户端将永远处于
等待状态。*/
test("客户端 ");
/*
http 模块提供了两个函数 http.request 和 http.get ,功能是作为客户端向 HTTP
服务器发起请求。

http.request(options, callback) 发起 HTTP 请求。接受两个参数, option 是
一个类似关联数组的对象,表示请求的参数, callback 是请求的回调函数。 option
常用的参数如下所示。
>  host :请求网站的域名或 IP 地址。
>  port :请求网站的端口,默认 80。
>  method :请求方法,默认是 GET。
>  path :请求的相对于根的路径,默认是“ / ”,
QueryString 应该包含在其中。例如 /search?query=byvoid 。
>  headers :一个关联数组对象,为请求头的内容。
callback 传递一个参数,为 http.ClientResponse 的实例。
http.request 返回一个 http.ClientRequest 的实例。
*/
/*var http = require('http');
var querystring = require('querystring');*/
/*
var contents = querystring.stringify({
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University',
});
var options = {
    host: 'www.byvoid.com',
    path: '/application/node/post.php',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length' : contents.length
    }
};
var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});
req.write(contents);
req.end();
*/
/*http.get({host: 'localhost',port: 3000,path:'/user?name=byvoid&email=byvoid@byvoid.com'}, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function (data) {
        console.log(data);
    });
});*/
/*http.ClientRequest 是由 http.request 或 http.get 返回产生的对象,表示一
个已经产生而且正在进行中的 HTTP 请求。它提供一个 response 事件,即 http.request
或 http.get 第二个参数指定的回调函数的绑定对象。我们也可以显式地绑定这个事件的
监听函数
//httpresponse.js
var http = require('http');
var req = http.get({host: 'www.byvoid.com'});
req.on('response', function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});
http.ClientRequest 像 http.ServerResponse 一样也提供了 write 和 end 函
数,用于向服务器发送请求体,通常用于 POST、 PUT 等操作。所有写结束以后必须调用 end
函数以通知服务器,否则请求无效。 http.ClientRequest 还提供了以下函数。

request.abort() :终止正在发送的请求。

request.setTimeout(timeout, [callback]) :设置请求超时时间, timeout 为
毫秒数。当请求超时以后, callback 将会被调用。
此外还有 request.setNoDelay([noDelay]) 、 request.setSocketKeepAlive
([enable] , [initialDelay]) 等函数,具体内容请参见 Node.js 文档*/

/*
http.ClientResponse 与 http.ServerRequest 相似,提供了三个事件 data 、 end
和 close ,分别在数据到达、传输结束和连接结束时触发,其中 data 事件传递一个参数
chunk ,表示接收到的数据。
http.ClientResponse 也提供了一些属性,用于表示请求的结果状态

statusCode : HTTP 状态码,如 200、404、500
httpVersion : HTTP 协议版本,通常是 1.0 或 1.1
headers : HTTP 请求头
trailers : HTTP 请求尾(不常见)

http.ClientResponse 还提供了以下几个特殊的函数。
response.setEncoding([encoding]) :设置默认的编码,当 data 事件被触发
时,数据将会以 encoding 编码。默认值是 null ,即不编码,以 Buffer 的形式存
储。常用编码为 utf8。
response.pause() :暂停接收数据和发送事件,方便实现下载功能。
response.resume() :从暂停的状态中恢复。*/

