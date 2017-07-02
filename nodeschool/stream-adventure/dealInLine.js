var through = require('through2');
var split = require('split');
//数据会被换行符分成一段一段的传输,如果想恢复成原数据,需要在每次发来的数据后面加上换行符
var i = 1;
var tr = through(function(buf, _, next) {
    if (i % 2 !== 0) {
        this.push(buf.toString().toLowerCase() + '\n');
    } else {
        this.push(buf.toString().toUpperCase() + '\n');
    }
    i++;
    next();
});

var map = require('through2-map');
var sy = map(buf => {
    if (i % 2 !== 0) {
        return (buf.toString().toLowerCase() + '\n');
    } else {
        return (buf.toString().toUpperCase() + '\n');
    }
    i++;
}); //通过实验可以得出through2-map并不会对每个数据段执行一次,而是等数据接收完毕以后执行一次

process.stdin.pipe(split()).
pipe(tr).pipe(process.stdout);
