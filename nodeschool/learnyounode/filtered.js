var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], (err, data) => {
    if (err) {
        return console.error(err);
    } else {
        var result = [];
        data.map(name => {
            if (path.extname(name) === '.' + process.argv[3]) {
                result.push(name);
            }
        });
        result.map(name => { console.log(name); });
    }
});
