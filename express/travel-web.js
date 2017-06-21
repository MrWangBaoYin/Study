var express = require('express');
var exphbs = require('express-handlebars');
var getPrize = require('./lib/prize.js');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});


app.use(express.static(__dirname + '/public'));
/*static 中间件可以将一个或多个目录指派为包含静态资源的目录,其中的资源不经过任何
特殊处理直接发送到客户端。你可以在其中放图片、CSS 文件、客户端 JavaScript 文件之
类的资源。*/

app.get('/', (req, res) => { //express默认的字符编码方式是utf8,不用显式设置
    /*res.type('text/plain');
    res.set('content-encoding', 'gzip');
    //res.status(200);Express 状态码默认为200不用显式指定
    res.send('德州旅游网站');*/

    //发送随机数据
    res.render('home', { prize: getPrize() });
});
/*需要注意,我们已经不再指定内容类型和状态码了:视图引擎默认会返回 text/html 的内
容类型和 200 的状态码。
在catch-all处理器(提供定制的404页面)以及500处理器中,我们必须明确设定状态码。
如果你再次启动服务器检查首页和关于页面,将会看到那些视图已呈现出来。如果你检查
源码,将会看到 views/layouts/main.handlebars 中的套路化 HTML。*/

app.get('/about', function(req, res) {
    res.render('about', {
        prize: getPrize(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    //res.send('500 - Sever Error');
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('express started on http://localhost:' + app.get('port') + ';press Ctrl+C to terminate');
});
