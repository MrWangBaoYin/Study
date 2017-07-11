var slice = Function.prototype.call.bind(Array.prototype.slice);
module.exports = function(obj, method) {
        if (!obj[method]) {
            throw new Error('no exist');
        }
        var o = {};
        o.method = obj[method];
        o.count = 0;
        obj[method] = function() {
            o.count++;
            o.method.apply(obj, slice(arguments));
        }
        return o;
    } //感觉这个在研究源码的时候有用
