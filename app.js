var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 10 * 60 * 60 * 1000}
}));
app.use(express.static(path.join(__dirname, 'public')));

/* 中间件,判断用户是否登录 */
app.use(function (req, res, next) {
    if (req.url != '/login' && req.session.user === undefined) {
        res.redirect('/login');
        return;
    }
    res.locals.user = req.session.user;
    res.locals.auths = req.session.auths;
    res.locals.rolename = req.session.rolename;
    next();
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404');
    return;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;