module.exports = function(func, num) {
    if (num <= 0) {
        return;
    }
    func();
    return arguments.callee(func, num - 1);
}
