var spawn = require('child_process').spawn;

var duplexer = require('duplexer2');

module.exports = function(cmd, args) {
    var cP = spawn(cmd, args);
    return duplexer(cP.stdin, cP.stdout);
};
