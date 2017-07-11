module.exports = function(origial) {
    return function(target) {
        return target.map(a => {
            return origial.some(b => {
                return b.id === a.id;
            });
        }).every(a => {
            return a;
        });

    };
};
