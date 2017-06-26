var filtered = require('./mymoudle.js');

filtered(process.argv[2], process.argv[3], (err, fileNames) => {
    if (err) {
        return console.error(err);
    }

    fileNames.map(name => { console.log(name); });
});
