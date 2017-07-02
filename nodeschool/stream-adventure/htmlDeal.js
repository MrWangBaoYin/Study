var trumpet = require('trumpet');
var through = require('through2');
var tr = trumpet();
var fs = require('fs');

process.stdin.pipe(tr).pipe(process.stdout);

var stream = tr.select('.loud').createStream(); //选择流的一部分
stream.pipe(through(function(buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
})).pipe(stream); //对选中流进行操作然后在返回到选中流 流的替换
