var http = require('http');
var args = process.argv.slice(2);
var content = [];
for (let i = 0; i < args.length; i++) {
    var a = [];
    a.Length = 0;
    content.push(a);
}
//注意事项,闭包函数老是忘记让他先自己执行
var orderPrint = (function() {
    var i = 0;
    return function() {
        i++;
        if (i !== args.length) {
            return;
        }
        content.forEach(cont => {
            console.log(Buffer.concat(cont, cont.Length).toString());
        });

    };
}());


args.forEach((url, index) => {
    http.get(url, res => {
        res.on('data', data => {
                content[index].push(data);
                content[index].Length += data.length;
            }).on('end', orderPrint)
            .on('error', console.error);
    }).on('error', console.error);
});
