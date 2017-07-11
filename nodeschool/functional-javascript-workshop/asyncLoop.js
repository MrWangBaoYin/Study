 function loadUsers(userIds, load, done) {
     var users = [];
     var counter = 0;
     userIds.forEach(id => {
         load(id, user => {
             users.push(user);
             if (++counter === userIds.length) {
                 done(users);
             }
         });
     });

     //异步计数器函数
 }

 module.exports = loadUsers;
