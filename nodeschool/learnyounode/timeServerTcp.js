var net = require('net');

net.createServer(socket => {
    socket.end(getTimeStr() + '\n'); //不加\n通不过验证,在条件中说明了.
}).listen(parseInt(process.argv[2]));

function getTimeStr() {
    var date = new Date();
    var result = '';
    result += date.getFullYear() + '-' + toBeTwo(date.getMonth() + 1) + '-' + toBeTwo(date.getDate()) + ' ' + toBeTwo(date.getHours()) + ':' + toBeTwo(date.getMinutes());
    return result;

    function toBeTwo(num) {
        if (num < 10) {
            return '0' + num;
        }
        return '' + num;
    }
}
