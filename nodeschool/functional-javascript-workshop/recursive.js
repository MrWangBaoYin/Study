function reduce(arr, func, init) {
    if (init === undefined) {
        init = arr[0];
    }
    if (!arr.length) {
        throw new Error("volid arr can't use reduce");
    }

    for (let i = 0; i < arr.length; i++) {
        init = func(init, arr[i], i, arr);
    }

    return init;
}

module.exports = reduce;
//原来一直都是尾递归改循环,毕竟循环效率高吗,现在要用循环改尾递归了!

function reduce(arr, func, init) {
    if (init === undefined) {
        init = arr[0];
    }
    if (!arr.length) {
        throw new Error("volid arr can't use reduce");
    }

    return (function recursive(index, value) {
        if (index === arr.length) { //递归结束条件
            return value;
        } else { //传递的是条件和数据,操作被封装为一个函数
            return recursive(index + 1, func(value, arr[index], index++, arr)); //三个要素,条件,操作,数据.
        }
    }(0, init)); //一般立即调用函数都是匿名函数,这个真的特别
}
//我一点都想不明白搞成这么复杂,这么容易出错是为了什么,而且超难阅读
