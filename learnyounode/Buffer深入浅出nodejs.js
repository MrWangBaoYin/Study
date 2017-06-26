var test = require('../finished/test.js');
//在学buffer之前先学一下node内存控制
test('查看v8内存使用情况');
console.log(process.memoryUsage());
//v8垃圾回收策略主要基于分代式垃圾回收机制(没有一种垃圾回收算法能够胜任所有的场景)
//统计学起了较大作用,现代垃圾回收算法中按对象的存活时间将内存的垃圾回收尽行不同的分代,然后对不同的分代内存实施更高效的算法

/*在正常的JavaScript执行中,无法立即回收的内存有闭包和全局变量引用这两种情况,要小心*/

test('os中的内存查看方式 看的是操作系统内存使用情况');
var os = require('os');
var mb = 1024 * 1024;
console.log(os.totalmem() / mb + 'MB', os.freemem() / mb + 'MB');

/*堆外内存 不通过v8进行分配的内存 Buffer 利用堆外内存可以突破v8内存限制*/

/*Buffer 通过C++申请的,我学过C,就是C语言中的堆内存块 可以理解为一个个字符的数组*/
test('Buffer');

test('Buffer.length');
var buf = new Buffer(100);
console.log(buf.length);

test('Buffer元素的取值');
buf[20] = -100;
console.log(buf[20]);
buf[20] = 300;
console.log(buf[20]);
buf[20] = 3.1566;
console.log(buf[20]);

/*node采用的C内存分配方式中的slab分配机制*/
/*
new Buffer(str,[encoding]) 在初始化Buffer对象时,可以指定编码格式,默认为utf8
Buffer.write(str,[offset],[length],[encoding]); Buffer对象可以存储不同编码字符串的值,但每种编码对同一种符号所用的字节数可能不同,需要小心
Buffer.isEncoding(str) 来检查Buffer是否支持对应编码的转换

*/

test('Buffer.isEncoding');
console.log(Buffer.isEncoding('GB2312'));

test("正确的Buffer拼接方式");

var chunks = [];
var length = 0;
var res = (function() {
    require('events').call(this);
}());
res.on('data', data => {
    chunks.push(data);
    length += data.length;
});
res.on('end', () => {
    var buf = Buffer.concat(chunks, length);
    console.log(buf.toString());
});

test("Buffer.concat的实现");
Buffer.concat = function(list, length) {
    if (!Array.isArray(list)) {
        throw new Error('Usage: Buffer.concat(list, [length])');
    }
    if (list.length === 0) {
        return new Buffer(0);
    } else if (list.length === 1) {
        return list[0];
    }
    if (typeof length !== 'number') {
        length = 0;
        for (let i = 0; i < list.length; i++) {
            let buf = list[i];
            length += buf.length;
        }
    }
    var buffer = new Buffer(length);
    var pos = 0;
    for (let i = 0; i < list.length; i++) {
        let buf = list[i];
        buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
