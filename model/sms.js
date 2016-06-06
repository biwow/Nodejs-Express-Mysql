var test = require('../lib/query');
var async = require('async');
var md5 = require('md5');

exports.demo = function (req, res) {
    async.series({
        one: function (done) {
            test.index("select * from heshe_sms_log where id=29004", function (list) {
                done(null, list);
            });
        },
        two: function (done) {
            test.index("select * from heshe_sms_log where id=29005", function (list) {
                done(null, list);
            });
        },
        three: function (done) {
            test.index("select * from heshe_sms_log where id=29006", function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.render('index', {
            title: result.one[0]['phoneno'],
        });
        console.log('one:', result.one);
        console.log('two:', result.two);
        console.log('three:', result.three);
    })
};

exports.Plogin = function (req, res) {
    var user = req.body.username;
    var password = md5(req.body.password);
    test.index("select * from heshe_admins where user='" + user + "' and password='" + password + "'", function (list) {
        if (list) {
            req.session.user = user;
            res.cookie('token', 888888, {maxAge: 60 * 1000 * 60 * 24 * 7});
            res.clearCookie('login_error');
            res.redirect('/home');
        } else {
            console.log(req.cookies.login_error);
            if (req.cookies.login_error) {
                res.cookie('login_error', parseInt(req.cookies.login_error) + 1, {maxAge: 60 * 1000 * 60 * 24 * 7});
            } else {
                res.cookie('login_error', 1, {maxAge: 60 * 1000 * 60 * 24 * 7});
            }

            res.redirect('/login');
        }
    });
};

exports.Glogin = function (req, res) {
    if(req.session.user){
        res.redirect('/home');
    }else{
        res.render('login');
    }
};

exports.index = function (req, res) {
    res.redirect('/login');
};

exports.home = function (req, res) {
    if(req.session.user === undefined){
        res.redirect('/login');
    }
    res.render('index', {
        user: req.session.user
    });
};