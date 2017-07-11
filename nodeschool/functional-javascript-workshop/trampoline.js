function repeat(func, num) {
    return function() {
        if (num <= 0) {
            return;
        } else {
            return repeat(func, --num);
        }
    }
}

function trampoline(func) {
    while (func && typeof func === 'function') {
        func = func();
    }
}

module.exports = function(func, num) {
    trampoline(() => {
        return repeat(func, num);
    }); //return 一个执行函数同直接执行结果是一样的,只不过占用更少栈内存而已
};


//对于这一节还是不明白
