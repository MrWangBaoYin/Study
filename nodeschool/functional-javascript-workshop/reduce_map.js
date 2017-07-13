module.exports = function(arr, func) {
    var result = [];
    arr.reduce((init, e, i, arr) => {
        init.push(func(e, i, arr));//Array.prototype的繁返回值是新数组的长度,不是新数组
        return init;
    }, result);

    return result;
};
