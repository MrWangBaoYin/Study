module.exports = function(arr, func) {
    var result = [];
    arr.reduce((init, e, i, arr) => {
        init.push(func(e, i, arr));
        return init;
    }, result);

    return result;
};
