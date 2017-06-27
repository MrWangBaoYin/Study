var fs = require('fs');
//在使用字符编码后data变为字符串
fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data.split('\n').length - 1);
    }
});
