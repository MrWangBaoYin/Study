//参考菜鸟教程
var tool = require('./toolS.js'),
    type = tool.type,
    test = tool.test,
    curry = tool.curry,
    util = require('util'),
    inspect = util.inspect;

test('测试两个事件监听是否相同 ');

var EventEmitter = require('events'),
    event = new EventEmitter();

var listener1, listener2;
var listener = function(num) {
    console.log('this is listener' + num);
};
curry();
listener1 = listener.curry(1);
listener2 = listener.curry(2);

listener2();
event.addListener('certain', listener1);

event.listeners('certain').map(function(a) {
    a();
});
event.on('certain', listener2);
event.listeners('certain').map(function(a) {
    a();
});
/*没有顺序区别都相同*/
//EventEmitter.prototype.on = EventEmitter.prototype.addListener;这是源码
/*增加的方法
setMaxListeners(n)默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
listeners(event)返回指定事件的监听器数组。
listenerCount(emitter, event)返回指定事件的监听器数量。*/
test("添加事件监视可触发的事件 ");
event.on('newListener', function() { //这个事件触发时,事件还没添加完
    console.log('添加事件的数目是', this.listenerCount('certain'));
});
listener3 = listener.curry(3);
event.on('certain', listener3);
event.listeners('certain').map(function(a) {
    a();
});
console.log(event.listenerCount('certain'));
var haven = [];
for (var i in event) {
    console.log(i);
    if (event.hasOwnProperty(i)) {
        haven.push(i);
    }
}
console.log(inspect(haven));
console.log(require('events').defaultMaxListeners);
console.log(event.length);
test("函数的长度 ");
(function(a) {
    console.log("实参个数", arguments.length, "形参个数", arguments.callee.length);
}(1, 2, 3, 4));
/*每个函数都有一个 length属性 （函数名.length）， 表示期望接收的函数的个数（而不是实际接收的参数个数）
它与arguments不同。 arguments.length 是表示函数实际接收的参数个数*/
test("自己删除自己的函数 ");
var a = {};
a.sy = function() {
    delete a.sy;
    console.log('试试');
}; //额 自己删除自己,在对象中已经把对应的引用(复杂对象都是引用)删除了,但是在程序中依然存在,而且正在执行,会依然执行完,如果没有其它引用的话,就会被垃圾收集器彻底删除了.

a.sy();
test("测试事件模块源码");
event._events.error = { length: 0 };
event.emit('error', 1, 3);
