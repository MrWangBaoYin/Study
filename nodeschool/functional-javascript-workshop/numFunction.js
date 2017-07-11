module.exports = function(fun, num) {
    if (num > 0) {
        while (num--) {
            fun();
        }
    } else {
        return;
    }
};
