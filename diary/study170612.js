"想到解决异步回调的办法,用事件模块就好了,本来事件模块就是函数回调的封装";
"用事件模块写出来的代码不够清晰,把事件模块封装了一下";
var creatEl = function() { //单独封装成了一个模块
    var Event = require('events'),
        event = new Event(),
        slice = Array.prototype.slice;
    var step = function(num) {
        var exArg;
        if (arguments.length > 1) {
            exArg = slice.call(arguments, 1);
        }
        return function() {
            var arg = exArg ? slice.call(arguments).concat(exArg) : slice.call(arguments);
            if (arg[0]) {
                arg[0].occur = num;
                event.emit('error', arg[0]);
            } else {
                var name;
                if (typeof num === 'number') {
                    name = 'step' + num;
                } else {
                    name = num;
                }
                event.emit('step' + num, arg.slice(1));
            }
        };
    };
    event.step = step;
    return event;
};

module.exports = creatEl;
/*-----------------------------------------------*/
//"对于异步递归目录的改进";
var fs = require('fs');

function print(ind) {
    var a = '';
    for (var i = 0; i < ind; i++) {
        a += '  ';
    }
    return a;
}

function getPath(name, isDir) {
    var path;
    if (name.indexOf('/') === 0) {
        path = name;
    } else {
        path = require('path').normalize(__dirname + '/' + name);
    }
    if (isDir) {
        path += '/';
    } else {
        if (fs.statSync(path).isDirectory()) {
            path += '/';
        }
    }
    return path;
}

function readSync(name, indent) {
    //同步版
    if (arguments.length === 1) {
        indent = 0;
    }
    var path = getPath(name);
    if (!fs.statSync(path).isDirectory()) {
        return;
    }
    var files = fs.readdirSync(path);
    files.sort((a, b) => {
        var aa = a.toUpperCase(),
            bb = b.toUpperCase();
        if (aa < bb) {
            return -1;
        } else {
            return 1;
        }
    });
    files.map((fileName) => {
        console.log(print(indent) + fileName);
        if (fs.statSync(path + fileName).isDirectory()) {

            read(path + fileName, indent + 2);
        }
    });


}
//初始的
function readEL(name, indent) {
    var fs = require('fs');
    var creatEl = require('./creatEL.js');
    if (arguments.length === 1) {
        indent = 0;
    }
    var path = getPath(name);
    var el = creatEl();
    fs.stat(path, el.step(1)); //0 先判断文件类型
    el. //事件链表
    on('step1', arg => { //1 如果是目录,进行第2步
        var stats = arg[0];
        if (stats.isDirectory()) {
            fs.readdir(path, el.step(2));
        }
    }).
    on('step2', arg => { //读目录,打印,遍历检查子文件类型
        var files = arg[0];
        files.sort((a, b) => {
            var aa = a.toUpperCase(),
                bb = b.toUpperCase();
            if (aa < bb) {
                return -1;
            } else {
                return 1;
            }
        });
        files.map(fileName => {
            console.log(print(indent) + fileName);
            fs.stat(path + fileName, el.step(3, path + fileName));
        });
    }).
    on('step3', arg => { //如果有子文件是目录,对那个文件再次调用这个函数,有点浪费,重复判断了,在简化
        var stats = arg[0];
        var newPath = arg[1];

        if (stats.isDirectory()) {
            readEL(newPath, indent + 2);
        }
    }).on('Error', err => {
        console.log(err);
    });


}
//第一次
//比原来好看多了,清晰多了
//超级简单的方法,再来个有难度的,只在step2 step3之间解决
//知难而退那就不是我了
function readEL(name, indent, isDir) {
    var fs = require('fs');
    var creatEl = require('./creatEL.js');
    if (arguments.length === 1) {
        indent = 0;
    }
    var path = getPath(name, isDir);
    var el = creatEl();
    if (isDir) {
        fs.readdir(path, el.step(2));
    } else {
        fs.stat(path, el.step(1));
    }
    el. //事件链表
    on('step1', arg => {
        var stats = arg[0];
        if (stats.isDirectory()) {
            fs.readdir(path, el.step(2));
        }
    }).
    on('step2', arg => {
        var files = arg[0];
        files.sort((a, b) => {
            var aa = a.toUpperCase(),
                bb = b.toUpperCase();
            if (aa < bb) {
                return -1;
            } else {
                return 1;
            }
        });
        files.map(fileName => {
            console.log(print(indent) + fileName);
            fs.stat(path + fileName, el.step(3, path + fileName));
        });
    }).
    on('step3', arg => {
        var stats = arg[0];
        var newPath = arg[1];

        if (stats.isDirectory()) {
            readEL(newPath, indent + 2, 1);
        }
    }).on('Error', err => {
        console.log(err);
    });


}
//第二次,还有个附加收获,根据空格就知道上一级目录中有多少文件夹
function readEL(name) {
    var fs = require('fs');
    var creatEl = require('./creatEL.js');
    var path = getPath(name);
    var el = creatEl();
    var indent = 0;
    fs.stat(path, el.step(1));
    el.
    on('step1', arg => {
        var stats = arg[0];
        if (stats.isDirectory()) {
            fs.readdir(path, el.step(2));
        }
    }).
    on('step2', arg => {
        var files = arg[0];
        var path2 = arg[2] || path;
        files.sort((a, b) => {
            var aa = a.toUpperCase(),
                bb = b.toUpperCase();
            if (aa < bb) {
                return -1;
            } else {
                return 1;
            }
        });
        files.map(fileName => {
            console.log(print(indent) + fileName);
            fs.stat(path2 + fileName, el.step(3, path2 + fileName));
        });
    }).
    on('step3', arg => {
        var stats = arg[0];
        var newPath = arg[1];

        if (stats.isDirectory()) {
            fs.readdir(newPath, el.step(2, indent++, newPath + '/'));
        }
    }).
    on('Error', err => {
        console.log(err);
    });


}
readEL("../Study");
