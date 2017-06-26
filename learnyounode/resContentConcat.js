var http = require('http');

http.get(process.argv[2], res => {
    var datas = [];
    var length = 0;
    res.on('data', data => {
        datas.push(data);
        length += data.length;
    });
    res.on('end', () => {
        datas = Buffer.concat(datas, length);
        console.log(datas.length);
        console.log(datas.toString());
    });
});
