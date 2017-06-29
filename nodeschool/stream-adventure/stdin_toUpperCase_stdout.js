var through = require('through2');

process.stdin.pipe(through((buffer, _, next) => {
    this.push()
}))
