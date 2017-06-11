var creatEl = function() {
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
                event.emit('Error', arg[0]);
            } else {
                var name;
                if (typeof num === 'number') {
                    name = 'step' + num;
                } else {
                    name = num;
                }
                event.emit(name, arg.slice(1));
            }

        };
    };
    event.step = step;
    return event;
};

module.exports = creatEl;
