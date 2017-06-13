var test = (function() {
    var all = [],
        num = 1,
        b = '__________________________',
        i;
    b = b + b;
    var target = function(str) {
        var number = num >= 10 ? num.toString() : '0' + num;
        var a = '第' + number + '次测试: ' + str + ' ';
        console.log(b);
        console.log('\n', a);
        all.push(a);
        num++;
    };
    target.printAll = function() {
        for (i = 0; i < all.length; i++) {
            console.log(all[i]);
        }
    };
    return target;
}());
//原来的test为了整齐不能打印英文,现在解决了
module.exports = test;
