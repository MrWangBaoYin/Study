var args = process.argv.slice(2);
console.log(args.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b); }));
