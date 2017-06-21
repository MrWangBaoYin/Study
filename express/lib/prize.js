module.exports = function() {
    var data = ['一等奖', '二等奖', '三等奖', '四等奖'];
    return data[Math.floor(Math.random() /*(含0,不含1)*/ * data.length)];
};
