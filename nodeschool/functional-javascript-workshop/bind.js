module.exports = function(namespace) {
    return console.log.bind(null, namespace);
};
//仔细体会下bind同call和apply的不同
Function.prototype.bind = function(obj) {
    var slice = Array.prototype.slice;
    var args1 = slice.call(arguments, 1);
    return function() {
        return this.apply(obj || this, args1.concat(slice.call(arguments)));
    } /*这里的this是函数本身*/
 
}; //只是为了理解,不可以实际使用,不够严格.

//slice的调用简单化

var slice = Function.prototype.call.bind(Array.prototype.slice);
///相当于吧call方法放在slice之后调用 等同于 slice.call()
