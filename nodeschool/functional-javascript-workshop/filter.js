module.exports = function(notes) {
    return notes.filter(a => {
        return a.message.length < 50;
    }).map(a => {
        return a.message;
    });
};
