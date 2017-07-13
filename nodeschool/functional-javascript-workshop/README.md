两个更加简洁的函数调用
---

1. 转化arrayList类型到Array
```javascript  
var slice = Function.prototype.call.bind(Array.prototype.slice);
var args = slice(arguments);
```

2. 检查数据类型
```javascript
var type = Function.prototype.call.bind(Object.prototype.toString);
console.log(type([]));
```

### 一定要理解好[bind]('https:github.com/rswby/Study/nodeschool/functional-javascript/bind.js')

---
函数的curry
---
1. 原来curry的实现
```javascript
function curry() { //函数套用
    Function.prototype.curry = function() {
        var slice = Array.prototype.slice,
            args = slice.call(arguments),
            that = this;
        return function() {
            that.apply(null, args.concat(slice.apply(arguments)));
        };
    };
}
```
2. bind curry的实现
```javascript
function curryN(fn, n) {
    n = n || fn.length
    return function curriedN(arg) {
        if (n <= 1) return fn(arg)
        return curryN(fn.bind(null, arg), n - 1)
    }
}
```
类似于
```javascript
var add = function(a, b, c) {
    return (a + b + c);
};

add.bind(null, 1).bind(null, 2).bind(null, 3)();
```

其实最简单的函数套用方式是
```javascript
var add1_2 = function(arg){
	return add(1,2,arg);
}
```
难道不是吗??

---
循环的尾递归化
---
原来学过将尾递归转化为循环,现在又有了将循环变为尾递归的需求了

所有的循环都能改为递归,也就是尾递归.但不是所有的递归都能改为循环
	
这个教程一直在强调递归思想


---
注意点
---
1. ```javascript Array.prototype.reduce ``` 的参数中是有一个可以省略的初始值的,只有初始值省略时,才会把数组的第一个元素作为初始值,竟然一开始学的时候就错了!!!
