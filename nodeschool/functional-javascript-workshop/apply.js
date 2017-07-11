module.exports = function(namespace) {
    return function() {
        console.log.apply(null, [namespace].concat(Array.prototype.slice.call(arguments)));
    }
}
