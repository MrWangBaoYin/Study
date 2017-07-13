var slice = Function.prototype.call.bind(Array.prototype.slice);


function curryN(fn, n) {
    n = n || fn.length
    return function curriedN(arg) {
        if (n <= 1) return fn(arg)
        return curryN(fn.bind(null, arg), n - 1)
    }
}

var add = function(a, b, c) {
    return (a + b + c);
};

add.bind(null, 1).bind(null, 2).bind(null, 3)();
//就是利用bind的前置参数功能实现函数的柯里化
//因为bind会产生另一个函数
//在笔记中,有bind的真实实现,其中有很多要注意的地方
module.exports = curryN;
//明确一下目标,就是返回一个函数,所以直接返回一个函数就好