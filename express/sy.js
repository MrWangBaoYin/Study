var a = function(a) {
    if (typeof a !== 'number') {
        throw new Error('不是数字');
    }
};

try {
    a('a');
} catch (err) {
    console.error(err.stack);
}
