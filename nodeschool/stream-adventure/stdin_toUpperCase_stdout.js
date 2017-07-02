var through = require('through2');

process.stdin.pipe(through(function(buffer, _, next) {
    this.push(buffer.toString().toUpperCase());
    next();
})).pipe(process.stdout);

/*var map = require('through2-map');

process.stdin.pipe(map(buffer => {
    return buffer.toString().toUpperCase();
})).pipe(process.stdout);
*/
