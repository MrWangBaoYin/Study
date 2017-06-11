var fs = require('fs');

function getPath(name) {
    var path;
    if (name.indexOf('/') === 0) {
        path = name;
    } else {
        path = require('path').normalize(__dirname + '/' + name);
    }
    if (fs.statSync(path).isDirectory()) {
        path += '/';
    }
    return path;
}

function print(indent) {
    var a = '';
    for (var i = 0; i < indent; i++) {
        a += '  ';
    }
    return a;
};
exports.read = read;
exports.readSync = readSync;

function readSync(name, indent) {
    //同步版
    var indent = indent || 0,
        path = getPath(name);
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

/*fs.stat('../', function(err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log(stats);
    }
});*/



function read(name, indent) {
    var indent = indent || 0;
    var path = getPath(name);
    fs.stat(path, (err, stats) => {
        if (err) {
            console.log(err);
        } else {
            if (stats.isDirectory()) {
                fs.readdir(path, function(err, files) {
                    if (err) {
                        console.log(err);
                    } else {
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
                            fs.stat(path + fileName, (err, stats) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (stats.isDirectory()) {
                                        read(path + fileName, indent + 2);
                                    }
                                }
                            });
                        });
                    }
                });
            } else {
                return;
            }
        }
    });

}


/*read('../Study');
 */
