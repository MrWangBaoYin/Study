var request = require('request');

process.stdin.pipe(request("http://www.baidu.com")).
pipe(process.stdout);
