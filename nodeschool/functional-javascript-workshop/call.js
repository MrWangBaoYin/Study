module.exports = function() {
    var args = Array.prototype.slice.call(arguments);
    var results = args.map(a => {
        return Object.prototype.hasOwnProperty.call(a, 'quack') ? 1 : 0;
    });
    return results.reduce((a, b) => {
        return a + b;
    }, 0);
}

function duckCount() {
    return Array.prototype.slice.call(arguments).filter(function(obj) {
        return Object.prototype.hasOwnProperty.call(obj, 'quack')
    }).length
}
//官方的,比我的简单
