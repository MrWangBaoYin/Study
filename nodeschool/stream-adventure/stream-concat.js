var concat = require('concat-stream');
process.stdin.pipe(concat(content => {
    var middle;
    var start = 0;
    var end = content.length - 1;
    while (start < end) {
        middle = content[start];
        content[start] = content[end];
        content[end] = middle;
        start++;
        end--;
    }

    process.stdout.write(content.toString());

}));

/*
字符串反转的快捷方式 buf.toString().split('').reverse().join('')
*/
