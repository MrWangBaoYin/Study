var spawn = require('child_process').spawn;

var args = process.argv.slice(3);

var ls = spawn(process.argv[2], args);
//产生一个子进程来执行命令行程序

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
});
