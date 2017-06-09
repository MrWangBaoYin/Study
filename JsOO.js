//对象属性的get set 方式 
var a={
    name:'xiao ming',
    _age : 20,
    get age(){
        return this._age;
    },
    set age(a){
        if(a < 0 || a > 100)
            throw new Error('arg error');
        this.age = a;
    },
    height:40

}

console.log(a.age);
console.log(a._age);
/*a.age = 101;*/
console.log(a.age);
console.log('age' in a);
// 等号后面的逻辑运算符  ||等于第一个为真的值,如果都为假,等于最后一个值(遇真停)
//&&等于最后一个为真的值,如果第一个为假,等于第一个值(遇假停)
var c=a.nihao||a.buhao||a.aaa||a.age;
console.log(c);

var d=a.name&&a.height&&a.age;
console.log(d);

/*Object.defineProperty() 和 defineProperties 中可以定义属性的描述值 Object.getOwnPropertyDescriptor()获取属性的描述值*/

/*writable enumerable configurable 注意在Object.defineProperty()设置属性的getter和setter时,不能设置属性的value属性和writable属性*/

var e={};
Object.defineProperty(e,'a',{
    get:function(){
        console.log(this===e);
        return value;
    },
    set:function (a) {
        if(a>0){
            console.log(this);
            value = a;
        }

    },
    configurable:true,
    enumerable:true
});
console.log('a' in e);

e.a = 20;
console.log(e.a);
var result = Object.getOwnPropertyDescriptor(e,'a');
console.log(result);
console.log(Object.prototype.toString.call(result));
/*注意,在字面量中get set设置是this._name在define函数中设置
的是value .......注意 */

/*对象的遍历*/
function 遍历原型链属性(a) {
    for(var i in a){ /*但不会打印系统自带属性,也不能打印enumerable为false的属性*/
        console.log(i+':'+a[i]);
    }
}
 遍历原型链属性(a);
/*获取对象属性.只是简写形式,在属性名不规则,属性名是变量的时候
用且只能用[]*/
/*方法只是对是函数引用的属性的别称*/

var A=function(a,b,c){
    this.a=a;
    this.b=b;
    this.c=c;
    this.say=function(){
        console.log('ni hao');
    }
}

A.prototype.zuo = function() {
    console.log('this is prototype property');
};

var a = new A(1,2,3);
var result = Object.keys(a);
console.log(result);
console.log(typeof(result) +':' + result);
var arr = [];
console.log(typeof arr);
console.log(Object.prototype.toString.call(result));
var own = a.a;
var list = A.prototype.zuo;
var base = a.toString;
console.log('a' in a);
console.log('zuo' in a);
console.log('toString' in a);
console.log(a.hasOwnProperty('a') + '' + a.hasOwnProperty('zuo') + a.hasOwnProperty('toString'));


console.log('f' in a);
/*Object.keys();返回对象所有属性值的名字,比for in循环少返回原型链上的属性*/

/*常用对象
基本类型Null Undefined Boolean Number String
复杂类型Object又细分为
Array Function Json Date RegExp Error 等*/
//基本类型赋值时是值复制,复杂类型赋值时是传递地址,也就是引用

/*类型判断
    typeof可以检测出number,string,boolean, function,undefined;

    用对象的constructor===对应的类型可以检测出
    除了undefined null的所有类型,
    但是不保险因为属性的constructor可以被修改

    使用Object.prototype.toString.call(target)可以检测出所有类型
    jQuery中的$.type就是通过这个函数实现的
    str.indexOf('zstr')寻找子串
    */

/*判断属性是否属于对象:in只要对象本身可以访问到的属性都会返true,hasOwnProperty只对对象本身拥有的属性返回true
*/

/*在构造器层面上,Function是顶点,在原型链层面上null是顶点*/

/*instranceOf 关键字 判段对象是否为某个函数的实例*/
/*http://www.oschina.net/question/565065_86370?sort=time
*/
