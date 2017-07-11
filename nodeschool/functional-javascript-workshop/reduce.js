module.exports = arr => {
    return arr.reduce((init, a) => {
        if (init.hasOwnProperty(a)) {
            init[a]++;
        } else {
            init[a] = 1;
        }
        return init;
    }, {});
}

//原来reduce有初始值一说,一开始学错了,坑人啊.
