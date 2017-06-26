 /*These four things are the contract that your module must follow.

            1. Export a single function that takes exactly the arguments described.
            2. Call the callback exactly once with an error or some data as described.
            3. Don't change anything else, like global variables or stdout.
            4. Handle all the errors that may occur and pass them to the callback. */

 var fs = require('fs');
 var path = require('path');

 module.exports = function(filePath, filter, fn) {
     if (!fn && !filePath && !filter) { //错误处理这里一开始错了
         throw new Error('argumnets error');
     }

     fs.readdir(filePath, (err, data) => {
         if (err) {
             return fn(err);
         } //出错早返回是一种惯例,好处:比if else 结构更加清晰,而且缩进更好
         //不在当前的错误栈区继续处理错误,而是将错误返回到调用者栈区
         /*var result = [];
         data.map(name => {
             if (path.extname(name) === '.' + filter) {
                 result.push(name);
             }
         });*/
         var result = data.filter(name => {
             return path.extname(name) === '.' + filter; });
         fn(null, result);

     });
 };

 //map 和 forEach 的区别是 map会将对数组每个元素的操作的返回值组成一个新的数组, forEach 只进行操作,不会返回新数组 filter数组过滤器,回调函数返回布尔值,如果为真将元素复制到新数组
