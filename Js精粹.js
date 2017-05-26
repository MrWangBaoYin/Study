/*对象通过引用传递,它们永远不会拷贝*/
var Y = require('underscore');
var _ = Y._;
function 拷贝对象(obj){
    var a = {};
    for(var x in obj){
        a[x] = obj[x]
    }
    return a;
}
var test = (function(){
    var num = 1;
    return function (str) {
        var a = '第'+num+'次测试: '+str+' ';
        var b ='一一一一一一一一一一一';
        var b = b + b + b;
        console.log(a + b.slice(a.length));
        num++;
    };
}());
var a={
    name:'xiao ming',
    age :20,
    say :function(){
        console.log(this.name + ' say hello');
    }
}
test('对象赋值为引用');
a.say();

var b = a;
b.name = 'da ming';
console.log(a.name);

var c = 拷贝对象(a);
test("拷贝对象");
c.name = 'xiao hong';
console.log(a.name);
c.name = 'da ming';


console.log(_.isEqual(a,c));

/*原型*/
/*以某个对象为原型创建的新对象 ==> 继承于*/
function 继承于(proto){
    var a = function () {};
    a.prototype = proto;
    return new a;
}
test('继承于');
var d = 继承于(c);

d.say();

function type(target){
    console.log(Object.prototype.toString.call(target));
}
test('类型');
type(继承于);
type([1,3,4]);
type(d);
type(1);
type('ni hao');
type(null);
type(undefined);
type(true);
type(new Date);

/*函数和对象的不同 函数特有:函数的上下文 函数的行为 函数创建时附带的prototype属性 */
/*函数最与众不同之处在于它们可以被调用*/

/*函数(执行时)可以访问自身的参数和变量,也可以访问(定义时)
其外层的所有的变量,但不可以访问子级的变量.这叫做函数的上下文*/

/*在js中通过函数字面量创建的的函数对象包含一个连到外部上下文的连接,叫做闭包*/

/*不要把this和函数上下文混淆在一起*/

/*函数会有两个额外的参数arguments和this
**this的值取决于函数的调用模式
在JavaScript中共有四种调用模式:方法调用模式,函数调用模式,构造器调用模式和apply/call调用模式*/

/*()调用运算符,用在函数表达式后面,执行函数的行为,优先级和.[]并列第一序列*/
/**/




