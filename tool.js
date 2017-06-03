var test = (function () {
    'use strict';
    var all = [],
        num = 1,
        b = '一一一一一一一一一一一',
        target;
    b = b + b + b;
    target = function (str) {
        var number = num >= 10 ? num.toString() : '0' + num,
            a = '第' + number + '次测试: ' + str + ' ',
            result = a + b.slice(a.length);
        console.log(result);
        all.push(result);
        num += 1;
    };
    target.printAll = function () {
        var i;
        for (i = 0; i < all.length; i += 1) {
            console.log(all[i]);
        }
    }
    return target;
}());
exports.test = test;
exports.type = type;
exports.curry = curry;

function type (target) {
    return Object.prototype.toString.call(target);
}
function curry () {//函数套用
    Function.prototype.curry = function () {
        var slice=Array.prototype.slice,
            args=slice.call(arguments),
            that=this;
        return function(){
            that.apply(null,args.concat(slice.apply(arguments)));
        }
    }
}


