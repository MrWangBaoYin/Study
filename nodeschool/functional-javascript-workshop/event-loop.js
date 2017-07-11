function repeat(func, num) {
    if (num <= 0) return

    func()

    // release control every 10 or so
    // iterations.
    // 10 is arbitrary.
    if (num % 10 === 0) {
        setImmediate(repeat, func, num - 1);
    } else {
        return repeat(func, --num)
    }
}
//这里没看明白,先抄一下答案
module.exports = repeat
