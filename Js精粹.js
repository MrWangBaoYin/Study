/*对象通过引用传递,它们永远不会拷贝*/
var Y = require('underscore');
var _ = Y._; //在浏览器端验证时需要被注释
function 拷贝对象(obj){
    var a = {};
    for(var x in obj){
        a[x] = obj[x]
    }
    return a;
}
var test = (function(){
    var num = 1;
    var b ='一一一一一一一一一一一';
    b = b + b + b;
    return function (str) {
        var a = '第'+num+'次测试: '+str+' ';
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
test('对象赋值为引用 ');
a.say();

var b = a;
b.name = 'da ming';
console.log(a.name);

var c = 拷贝对象(a);
test("拷贝对象 ");
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
test('继承于 ');
var d = 继承于(c);

d.say();

function type(target){
    var a=Object.prototype.toString.call(target);
    return a;
}
test('类型 ');
console.log(type(继承于));
console.log(type([1,3,4]));
console.log(type(d));
console.log(type(1));
console.log(type('ni hao'));
console.log(type(null));
console.log(type(undefined));
console.log(type(true));
console.log(type(new Date));

/*函数和对象的不同 函数特有:函数的上下文 函数的行为 函数创建时附带的prototype属性 */
/*函数最与众不同之处在于它们可以被调用*/

/*函数(执行时)可以访问自身的参数和变量,也可以访问(定义时)
其外层的所有的变量,但不可以访问子级的变量.这叫做函数的上下文*/
/*在js中通过函数字面量创建的的函数对象包含一个连到外部上下文的连接,叫做闭包*/

/*不要把this和函数上下文混淆在一起*/

/*函数会有两个额外的参数arguments和this
**this的值取决于函数的调用模式
在JavaScript中共有四种调用模式:方法调用模式,函数调用模式,构造器调用模式和apply/call调用模式*/

/*()调用运算符,用在函数表达式后面,执行函数的行为,优先级和.[]并列第一序列,叫做调用表达式*/

/*当一个函数被保存为对象的的一个属性时,我们称它为一个方法.
当一个方法被调用时,this被绑定到它所属的对象.
如果一个调用表达式包含一个属性存取表达式(即一个.点表达式或[subscript]下标表达式),那么它被当做一个方法来调用,this绑定到函数所属于的对象*/
/*对于通过this改变所属对象上下文(也就是对象的属性)的方法称为公共方法*/

/*当一个函数并非对象的一个属性时,那么它被当做一个函数来调用
当函数按照此模式调用时,this被绑定到全局对象*/

/*是语言设计的一个错误,使方法不能利用内部函数来帮助它工作,因为this绑定到了全局对象,不能和方法共享对对象的访问权,规定在方法中用that代替this,方法内部函数就可以通过that来访问对象*/
test('函数调用模式 ');
var a={};
a.b={
    name:'xiao ming',
    say :function () {
        console.log('hello');
    },
    print:function () {
        console.log(this);
        function child() {
//            console.log(this);
        }
        child();
    }

}

a.b.print();
test("额外收获 ")
console.log(this);
(function () {
//   console.log(this); /*东西太多先注释*/
}());

/*额外收获 直接打印this不会打印全局详细信息,在嵌套中可以打印出全局信息的详细情况,*/

/*构造器调用模式 如果在一个函数前面加上new来调用,那么将创建一个隐藏连接到该函数的prototype成员的新对象,同时this将会绑定到那个新对象上   new前缀也会改变return语句的行为*/
/*目的就是结合new前缀调用的函数被称为构造器函数.按照约定,它们保存在以大写格式命名的变量里,因为如果运行时没在前面加上new不会警告也不会报错,因为函数会绑定到全局,还会污染全局变量,所以约定非常重要*/
test("构造器调用模式 ");
var A = function() {
    this.a = 1;
    this.b = 2;
}
A.prototype.say = function () {
    console.log('my property are '+this.a+this.b);
}

var b = new A();
console.log(b.a + b.b);
console.log(b.say());
var c = A();//c为undefined
/*console.log(c.a);
console.log(c.b);
console.log(c.say);*/

/*apply/call 调用模式允许我们选择this的值,把this绑定的对象作为第一个参数传入*/
test("测试改变绑定调用模式 沿用前面测试");
var c = {
    a:2,
    b:1
};
A.prototype.say.call(c);

/*函数中额外另给的arguments参数并不是一个真正的数组,只是一个类似数组的对象包括可以下标取值,还有length属性,但缺少数组的方法*/

/*一个函数总会返回一个值,如果没指定返回值,则返回undefined
如果函数前面加上new操作符,切返回值不是一个对象,则返回this(该新对象)*/
test("测试函数返回值的改变 ");
var A=function(){
    this.a = 1;
    this.b = 2;
    return 1;
}

var c = new A();
console.log(type(c));
console.log(c.a + c.b);

/*给Object.prototype添加方法来使得该方法对所有的对象可用,同样的可以给Function String Array Json Date RegExp Boolean Number等的Prototype添加方法,使之对所有的对应对象都可以使用*/
test("给对象原型添加属性,使之对其所有实例对象都可以使用")
if(typeof Object.beget!=='function'){
    Object.beget=function(obj){
        var F=function(){};
        F.prototype=obj;
        return new F();
    }
}
/*基于对象的简单继承*/
Function.prototype.method=function(name,func){
    if(!this.prototype[name]){
        this.prototype[name]=func;
    }
    return this;
}

Number.method('integer',function(){
    return Math[this>0?'floor':'ceil'](this);
    //这里操作函数名
});

console.log((-10/3).integer());

/*通过给基本类型增加方法,可以大大提高语言的表现力,基本类型的原型是公共的结构,在类库混用时务必小心*/
/*原型链测试*/
test("原型链 原型");
console.log(Object.__proto__===Function.prototype);
console.log(Number.__proto__===Function.prototype);
console.log(Function.__proto__===Function.prototype);
console.log(Function.prototype.__proto__===Object.prototype);
console.log(Object.prototype===null);
/*递归*/
test("汉诺塔问题 ");
function 汉诺塔(disc,fir,sec,thr) {
    if(disc>0){
        汉诺塔(disc-1,fir,thr,sec);
        console.log('移动第'+disc+"盘子从第"+fir+'根柱子到第'+thr+'根柱子');
        汉诺塔(disc-1,sec,fir,thr);
    }
}

汉诺塔(3,'一',"二",'三');

/*递归函数可以高效的处理树形结构,不如浏览器的文档对象模型DOM*/
/*给定节点,便利包括该节点的所有后面的节点*/
function 递归节点(node,func) {
    func(node);
    node = node.firstChild;
    while(node){
        递归节点(node,func);
        node=node.nextSibling;
    }
}

/*尾递归:是一种在函数的最后执行递归调用语句的特殊形式的递归,这种递归可以被替换为一个循环,可以显著提高速度,并且深度递归不会因为栈溢出而失败*/
/*js并没有提供尾递归优化*/
test('尾递归优化 ');
var factorial=function factorial(i,a){
    a = a || 1;  //这里默认参数
    if(i < 2){
        return a;
    }
    return factorial(i - 1,a * i);
}

/*尾递归优化*/

var result=function (i,a) {
    for(a=a||1;i>=2;i--)
        a=a*i;
    return a;
}

console.log(factorial(4));
console.log(result(4));

/*作用域*/
test("作用域测试1");//函数声明优先级高于变量声明
console.log(type(sy));
function sy(){}
var sy = 1;
console.log(type(sy)); //动态变量的性质,上一步进行了赋值

test("作用域测试2");
sy2();//同名函数声明,越后面优先级越高
function sy2() {
    console.log('appear first');
}
function sy2(){
    console.log('appear second');
}
sy2();

test("作用域测试3");//变量声明冲突无所谓的,未执行到赋值语句,变量都是undefined
//注意,对于用var声明的变量,再起赋值语句前面调用时,它的值为undefined,如果没有用var声明的变量在其赋值语句之前调用会报错
console.log(type(sy3));
var sy3 = 1;
var sy3 = null;
console.log(type(sy3));

test("作用域测试4");//就和普通变量没啥不同
console.log(type(sy4));
var sy4=function(){
    console.log("给变量赋值的匿名函数");
}
console.log(type(sy4));

test("作用域测试5");
console.log(type(sy5));
/*console.log(type(aa);*/

var sy5=function aa(){
    console.log("给变量赋值而且有名字的函数");
}
console.log(type(sy5));
/*console.log(type(aa);*///有名字也没法访问

/*JavaScript不支持块作用域,支持函数作用域*/

/*作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量(除了this和arguments)*/

/*通过返回内部函数,使函数内部可以被外界访问,而且内部函数有比外部函数更长的生命周期*/
/*不但可以返回内部函数,还可以返回包含内部函数的对象,总是自己限制自己的思维*/
/*闭包实例*/
/*闭包访问的并不是外部函数参数和变量的一个拷贝,访问的是参数和变量的本身*/
var myObject=(function(){
    var value = 0;
    return{
        increament:function (a) {
            value+=typeof a ==='number'?a:1;
        },
        getValue:function () {
            return value;
        }
    };
}());

/*当创建对象的函数被设计成无需和new配合使用时,首字母不必大写*/
/*定义一个函数,它设置一个DOM节点为黄色,然后把它渐变为白色*/

var fade=function(node){
    var leval = 0;
    function step(){
        var hex = leval.toString(16);
        node.backgroundColor='#ffff'+hex+hex;
        if(leval<15){
            leval+=1;
            setTimeout(step,100);
        }
    }
    step();
}
/*外部的变量啊函数啊最后都会归到window上，为了节约资源把不需要的属性或方法赋值为null，可用于垃圾回收,js垃圾回收的方式是标记回收,可以访问到的不会回收,访问不到的对象会被标记一个状态,一定时间间隔后,会被垃圾收集器回收,释放内存*/

/*用setTimeout预定自己再次运行,延长生命周期*/

/*函数的声明,后面声明会覆盖前面的,而变量同名被忽略.函数的声明优先级高,(但里面的内容不会被关心),直到函数被调用时函数内部在形成自己的词法环境,按照规定的语法规则执行*/

/*设置节点事件处理程序的两种方式*/
test("节点事件处理程序 浏览器端")
var add_the_handles1=function(nodes,event){
    for(var i=0;i<nodes.length;i++){
        nodes[i]['on'+event]=(function (num) {
            return ()=>console.log(num);
        }(i));
    }
}

var add_the_handles2=function(nodes,event){
    for(var i=0;i<nodes.length;i++){
        (function(num){
            nodes[i]['on'+event]=function () {
                console.log(num);
            };
        }(i));
    }
}
/*闭包注意点:
父函数每调用一次,产生一个新的闭包对象;*/

/*函数的回调,用于异步请求*/
/*模块:我们可以使用函数和闭包来构建模块.
模块是一个提供接口却隐藏状态和实现的函数或者对象,通过函数产生模块几乎可以完全摒弃全局变量的使用*/
test("模块 正则表达式");
/*寻找HTML中的字符实体并替换它们为对应字符*/
String.method('deentityify',function () {
    var obj={
        '&quot;':'"',
        '&lt;'  :'<',
        '&gt;'  :'>'
    };

    return function () {
        return this.replace(/&[a-z]{2,4}\;/g,function (a,b) {
            console.log(b);
            return obj[a];
        }
        );
    };
}());

console.log('&lt;&gt;&quot;'.deentityify());
/*正则表达式 替换指定的正则表达式所定义的字符模式的所有匹配项
函数参数为:
第一个参数在regex这个完整的正则匹配出来的结果
倒数第二个参数是第一个参数（匹配结果）在输入字符串中的索引位置
最后一个参数是输入字符串本身
如果regex中存在分组，那么参数列表的长度N>3一定成立，且第2到N-2个参数，分别为regex中分组所产生的匹配结果*/

/*模块模式的一般形式是一个定义了私有变量和私有函数的函数,利用闭包创建可以访问私有变量和私有函数的特权函数,最后返回这些特权函数(对象),或者吧它们保存到一个可访问的地方*/

/*函数的级联*/
/*有一些方法没有返回值,例如一些设置或修改对象的某个状态不用返回任何值的方法,让这些方法返回this而不是undefined,就可以启用级联*/
/*级联可以产生具备很强表现力的接口*/
test('函数套用 函数参数数组化')
Function.method('curry',function(){
    var slice=Array.prototype.slice;
    var args=slice.call(arguments);
    var that=this;
    return function(){
        that.apply(null,args.concat(slice.apply(arguments)));
    }
});
var add=(a,b)=>console.log(a+b);
add(2,3);
var add1=add.curry(1);
add1(3);
test("参数数组的特殊属性 ")
var a=function(num){
    if(num > 0){
        console.log(num);
        arguments.callee(num-1);
    }
}
a(3);
/*arguments这个类数组有一个独特的属性.callee就是它所在函数的引用*/
/*类数组转化为数组的方法*/
test('函数参数数组化 ');
var slice=Array.prototype.slice;
var b={
    1:3,
    2:4,
    6:5,
    length:4
};
var c=slice.apply(b);
console.log(type(c)+' '+c);
/*Array.prototype.slice.apply(arguments)这是运行效率比较快的方法（看别人资料说的）,为什么不是数组也可以，因为arguments对象有length属性，而这个方法会根据length属性,返回一个具有length长度的数组。若length属性不为number，则数组长度返回0;所以其他对象只要有length属性也是可以的哟，如对象中有属性0,对应的就是arr[0],即属性为自然数的number就是对应的数组的下标，若该值大于长度，就被舍弃了。*/
/*新增的方式有Array.from(arguments)*/
/*最简单的方式用个循环*/
/*slice参数为0时,可以省略*/

/*函数的记忆:函数可以用对象去记住先前操作的结果,从而避免无谓的运算,这种优化被称为记忆*/
test("记忆函数实例 记忆斐波那契数列")
var 记忆斐波那契数列=(function(){
    var arr=[0,1];
    var count=0;
    return {
        compute:function(num){
            var callee=arguments.callee;
            if(num < 0){
                return 0;
            }
            else{
                if(!arr[num]){
                    arr[num]=callee(num-1)+callee(num-2);
                    count++;
                }
                return arr[num];
            }
        },
        count:()=>console.log(count)
    }
}());
for(var i=0;i<=11;i++){
    console.log(i+':'+记忆斐波那契数列.compute(i));
}
记忆斐波那契数列.count();

/*函数中还有一个隐藏属性caller,返回调用指定函数的函数.如果一个函数f是在全局作用域内被调用的,则f.caller为null,相反,如果一个函数是在另外一个函数作用域内被调用的,则f.caller指向调用它的那个函数.*/
test("函数调用者 ")
var a ={
    say:()=>console.log(arguments.callee.caller)
}

a.say();

var a=function(){
    console.log(arguments.callee.caller);
}
var b=function(){
    a();
}

b();
a();
var c={};
a.apply(c);

test('记忆函数一般化 ');
var memoizer=function(memo,express){
    return function(num){
        callee=arguments.callee;
        if(num<0){
            return 0;
        }
        else{
            if(!memo[num]){
                memo[num]=express(callee,num);
            }
            return memo[num];
        }
    };
};
test('记忆函数一般化验证1斐波那契数列');
var fibonacci=memoizer([0,1],function(shell,num){
    return shell(num-1)+shell(num-2);
});
for(var i=0;i<=11;i++){
    console.log(i+':'+fibonacci(i));
}
test('记忆函数一般化验证2阶乘');
var factorial=memoizer([1],function(shell,num){
    return num*shell(num-1);
});
for(var i=0;i<=11;i++){
    console.log(i+':'+factorial(i));
}

/*继承:在那些基于类的语言中,继承提供两个有用的服务,首先它是代码重用的一种形式,另一个好处是它包含了一套类型系统的规范*/
/*JavaScript提供了一套更为丰富的代码重用模式,可以模拟那些基于类的模式,同时也支持其它更具表现力的形式*/
/*在基于类的语言中,对象是类的实例,并且类可以从另一个类继承.
JavaScript是一门基于原型的语言,这意味着对象直接从其它对象继承*/

/*伪类 构造器函数*/
/*对伪类的继承的封装*/
test('伪类 构造器函数封装')
Function.method('inherits',function(Parent){
    this.prototype=new Parent();
    return this;
});
/*给Function.prototype添加的方法中的this指代调用对应方法的函数,且对所有函数对象可用*/
/*inherits和method方法都返回this,这允许我们可以以级联的样式编程*/
var Cat=function(name){
    this.name=name||'cat';
}.
method('say',function(){
    console.log(this.name+' miao miao miao');
});
var BigCat=function (name,age) {
    this.age=age||20;
    this.name=name||'bigCat';
}.
inherits(Cat).
method('active',function(){
    this.say();
    console.log('抓老鼠');
});

var mao=new BigCat('aierlan',13);
mao.active();

/*在基于类的语言中,类的继承是代码是代码重用的的唯一方式,JavaScript中有更多更好的选择*/
/*在一个纯粹的原型模式中,我们会摒弃类,转而专注域对象
基于原型的继承在概念上更为简单:一个新对象可以继承旧对象的属性*/
test('基于原型的继承 一个类继承另一个类');
var cat={
    name:'xiao mao',
    say :()=>console.log('miao miao miao '),
    active:()=>console.log('zhua lao shu')
};
var smallCat=Object.beget(cat);
smallCat.name='small cat';
smallCat.active=()=>console.log('sleep play');
console.log(smallCat.name);
smallCat.say();smallCat.active();
/*通过Object.beget(),在通过差异化继承,定制一个新对象,指明它与所基于对象的区别*/
/*原型函数化 用来处理私有属性 用闭包来解决*/
test('原型继承的函数化');
var mammal=function(spec,shared){
    //shared共享的
    var that=shared||{};
    that.get_name=function(){
        return spec.name;
    };
    that.says=function(){
        return spec.saying || ' ';
    };
    return that;
}
var myMammal=mammal({name:'herb'});
/*后面都不太懂,先写上以后再看*/
/*原型继承函数化*/
var cat=function(spec){
    spec.saying=spec.saying||'nihao';
    var that=mammal(spec);
    that.doSomething=()=>console.log("special");
    return that;
};
/*name saying属性完全私有的,只能通过特权方法去访问*/
/*如果特权方法用于多处,可以分两步定义 function a(){};
that.a=a;防止that属性更改后对原型造成伤害*/
var myCat=cat({name:'ChengLei'});
console.log(myCat.get_name());
console.log(myCat.says());
myCat.doSomething();

/*函数化模式提供了了一个处理父类的方法的方法*/
Object.method('superior',function(name){
    var deal=this[name];
    var that=this;
    return function(){
       return deal.apply(that,arguments);
    };
});//两个return保留对返回值的处理权限

/*函数的部件 完全没看懂*/

/*数组 JavaScript数组length没有上界,如果用大于length的下标来保存一个元素,length将会增大来容纳新元素*/
/*设置更大的length如需给数组分配更多的空间,二八length设小将导致所有大于等于新length的属性被删除*/
/*JavaScript数组其实就是对象 数组手术刀splice(起点,终点,添加的元素...)*/
/*JavaScript许多特性借鉴自其它语言,语法借鉴自Java,函数借鉴域Scheme,原型继承借鉴于Self,正则表达式借鉴于Perl*/
/*正则表达式是一门简单语言的语法规范.它以方法的形式被用于对字符串中信息进行查找,替换和提取操作*/
/*可处理正则表达式的方法有regexp.exec,regexp.test,string.match,string.replace,string.search,string.split看相关教程,看不懂图*/

/*JavaScript包含了少量可用在标准类型类型上的标准方法*/




test('array.reverse');
/*反转array中元素的顺序,会改变array*/
test('array.shift');
/*移除array中的第一个元素并返回该元素,如果array是空的则返回undefined,shift通常比pop慢的多*/
test('array.unshift');
/*在array中头部添加一个元素,并返回array的新length,对元素的操作方式同push*/
test('array.slice');
/*对于参数为负的情况,是从后面开始数*/


test('array.concat源码');
/*concat方法返回一个新数组,它包含array的浅复制,并将一个或多个参数item附加在其后.如果item元素是一个数组,那么它的每个元素会被分别添加*/
var a=['a','b','c',{name:'xiaoming',age:'20'}];
var b=['e','f','g'];
var c=a.concat(b,true);
console.log(c);
c[3].name='daming';
console.log(a);
/*注意在JavaScript中复杂对象都是浅拷贝,但是不包括String对象*/

var concat=function(){
    var a=[];
    var isArr=type([]);

    for(i=0;i<arguments.length;i++){
        if(type(arguments[i])===isArr){
            array(arguments[i]);
        }
        else{
            a[a.length]=arguments[i];
        }
    }
    return a;
    function array(arr){
        var alen=a.length;
        var length=a.length+arr.length;
        for(var i=alen;i<length;i++){
            a[i]=arr[i-alen];
        }
    }
}

var a=[1,2,3,4,5];
var b=['a','b','c','d','e'];
var d = a.concat(b,{name:'aaa'},'nihao');
var c = concat(a,b,{name:'aaa'},'nihao');
console.log(c);
console.log(d);
console.log(_.isEqual(d,c));
test('array.join');
/*join方法把一个array构造成一个字符串,它将array中的每个元素构造成一个字符串,并用一个separator为分隔符把它们连接在一起,默认的separator是','.为了实现无间隔的连接,我们可以使用空字符串作为separator*/
/*如果你想吧大量片段组装成一个字符串,把这些片段放到一个数组中并用join方法连接通常比+来连接快*/
console.log(a.join());
/*其实join()里面填入"</option><option>"的意思就是为数组每个元素前后都添加上
</option>北京市<option></option>上海市<option>.*/
var array=["北京市","上海市","广州市","深圳市"];
var html="<option>" + array.join("</option><option>")+ "</option>";
console.log(html);
var join=function(arr,separator){
    var a='';
    for(var i=0;i<arr.length;i++){
        a+=arr[i].toString();
        if(i!=arr.length-1){
            a+=separator;
        }
    }
    return a;
}
var html1='<option>'+join(array,'</option><option>')+'</option>';
console.log(html1);
console.log(_.isEqual(html,html1));

test('array.pop');
/*pop和push方法使array象stack一样工作,pop方法移除数组最后一个元素,并返回该元素,如果array是空的,则返回undefined*/
/*pop的可能实现*/
/*Array.method("pop",function(){
    return this.splice(this.length-1,1)[0];
});*/
var pop=function(arr){
    var a=arr[arr.length-1];
    arr.length-=1;
    return a;
}
var b=a.slice();
var c=a.pop();
var d=pop(b);
console.log(_.isEqual(c,d));

test("array.push");
/*push方法将一个或多个参数item附加到一个数组的尾部,会改变数组array本身,如果item是一个数组,它会将参数数组作为单个元素整个添加到数组中.它返回这个array的新length*/
var push=function(arr){
    for(var i=1;i<arguments.length;i++){
        arr[length]=arguments[i];
    }
    return arr.length;
}
var sy={};
console.log(typeof Number('3234'));

(function(){
    console.log(arguments);
}('1','2',3,4,5));
/*???想实现下用对象模拟数组,需要$[]$操作符的重载,想到的方式是先预处理,把$[]$置换为对应的函数...
函数如何实现的...以后再说找时间去学习汇编*/
/*不用任何数组的东西,完全用对象实现*/
/*var array=function(){};
array.method('toString',function(){
    var start='$[';
    var end  =']$';
    for(var x in this){
        start+=x.toString();
    }

});
var a={};
a.toString=function(){return 'nihao';};
console.log(a);
var c={};
c.a=a;
console.log(c);
for(var x in c){
    if(c.hasOwnProperty(x))
        console.log(c[x]);
}*/ //以后再说,想的头痛
test('array.sort');//sort改变原数组
test('array sort插入排序')
var insert_sort=function(arr,func)
{
    var i,j,temp;
    for(i=1;i<arr.length;i++)
    {
        temp=arr[i];
        j=i-1;
        while(j>=0 && func(arr[j],temp)>0)
        {
            arr[j+1]=arr[j];
            j--;
        }
        arr[j+1]=temp;
    }
}

var a=[7,4,5,7,2,9,4];
var b=insert_sort(a,function(a,b){
    return a-b;
});
console.log(a);

//再次注意,在JavaScript中简单对象赋值时是复制,复杂对象赋值是是引用,一开始使用了swap函数,完全不知道错在哪里
test('array.sort希尔排序');

var shell_sort=function(arr,func)//K&R 想不出这么好的结构,记住吧
{
    var gap,i,j,temp;
    gap=Math.floor(arr.length/2);
    for(;gap>0;gap=Math.floor(gap/2))
    {
        for(i=gap;i<arr.length;i++)
        {
            for(j=i-gap;j>=0&&func(arr[j],arr[j+gap])>0;j-=gap)
            {
                temp=arr[j];
                arr[j]=arr[j+gap];
                arr[j+gap]=temp;
            }
        }
    }
}
var a=[7,4,5,7,2,9,4];
shell_sort(a,function(a,b){
    return a-b;
});
console.log(a);
test('array.sort快速排序');
var quick_sort=function(arr,func,low,high)
{
    high=high||arr.length-1;
    low=low||0;
    var i,j,base;
    if(low<high)
    {
       base=arr[low];
       i=low;
       j=high;
       while(i<j)
       {
          while(i<j && func(arr[j],base)>=0)
              j--;
          if(i<j){
              arr[i]=arr[j];
              i++;
          }
          while(i<j && func(arr[i],base)<=0)
              i++;
          if(i<j){
              arr[j]=arr[i];
              j--;
          }
       }
       arr[i]=base;//i==j 吧base放在中间
       quick_sort(arr,func,low,i-1);
       quick_sort(arr,func,i+1,high);
    }
}
var a=[7,4,5,7,2,9,4];
quick_sort(a,function(a,b){
    return a-b;
});

console.log(a);
test('array.sort归并排序');//排序任意数组和基本对象的混合
var merge=function(arr1,arr2){
    var func;
    var Arr=[];
    var other=[];
    for(var i=0;i<arguments.length;i++){
        if(type(arguments[i])===type(function(){})){
            func=arguments[i];
        }
        else if(type(arguments[i])===type([])){
            Arr.push(arguments[i]);
        }
        else{
            other.push(arguments[i]);
        }
    }
    if(!func){func=compare;}//如果没有比较函数,就使用默认比较参数
    var result=[];
    if(Arr.length){//防止参数中没有数组产生的异常
        result=map(Arr);
        result=reduce(result);
    }
    if(other.length){//如果参数中有单独的简单对象,合并为一个数组并排序,在归并到结果中
        return twoArrMerge(result,other.sort(func));
    }
    return result;
    function map(arr){//先把没一个数组参数分别进行排序
        var temp=[];
        for(var i=0;i<arr.length;i++){
            temp.push(arr[i].sort(func));
        }
        return temp;
    }
    function reduce(arr){
        var temp;//把多个排序好的数组归并为一个数组
        if(arr.length===1){
            return arr[0];//如果参数中只有一个数组直接返回这个数组
        }
        for(var i=0;i<arr.length;i++){
            if(i===0){
               temp=twoArrMerge(arr[i],arr[i+1]);
               i++;
            }
            else{
                temp=twoArrMerge(temp,arr[i]);
            }
        }
        return temp;
    }

    function twoArrMerge(arr1,arr2){
        var index1=0,index2=0;
        var target=[];
        while(index1<arr1.length&&index2<arr2.length){
            if(func(arr1[index1],arr2[index2])<=0){
                target.push(arr1[index1]);
                index1++;
            }
            else{
                target.push(arr2[index2]);
                index2++;
            }
        }
        if(index1===arr1.length){
            while(index2<arr2.length){
                target.push(arr2[index2]);
                index2++;
            }
        }
        if(index2===arr2.length){
            while(index1<arr1.length){
                target.push(arr1[index1]);
                index1++;
            }
        }
        return target;
    }
    function compare(a,b){
        if(a===b) return 0;
        if(typeof a===typeof b){
            if(typeof a==='string'){
                var c=a.toUpperCase();
                var d=b.toUpperCase();
                return c<d?-1:1;
            }
            return a<b?-1:1;
        }
        return typeof a<typeof b?-1:1;
    }
}
var a=[7,4,5,7,2,9,4];
var b=['a','e','g','sd','sdf','dsf','gadf','df','dfasd','fad','f'];
var c=merge(a,b,'sdfsd',1000,243,'zzz');
console.log(c);
var d=merge(a);
console.log(a);
var e=merge('nihao',230,'sdf',90);
console.log(e);


test('排序扩展 复杂对象数组排序');
var by=function(name,func){
    return function(o,p){
        var a=o,b=p;
        if(o&&p&&typeof o==='object'&&typeof p==='object'){
            a=o[name];
            b=p[name];
        }
        if(a===b){
            return typeof func==='function'?func(a,b):0;
        }
        if(typeof a===typeof b){
            if(typeof a==='string'){
                var c=a.toUpperCase();
                var d=b.toUpperCase();
                return c<d?-1:1;
            }
            return a<b?-1:1;
        }
        return typeof a<typeof b?-1:1;
    }
}
var a=[
    {first:'joe',last:'Besser'},
    {first:'moe',last:'Howard'},
    {first:'joe',last:'Derite'},
    {first:'shemp',last:'Fine'},
    {first:'curly',last:'Howard'}
];
var b=merge(a,by('first',by('last')));
console.log(b);
