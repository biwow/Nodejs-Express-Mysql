var test = require('../lib/mysql_testdb');
var async = require('async');
var md5 = require('md5');
var moment = require('moment');

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
        res.render('home', {
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
    test.index("select a.id,b.auths,b.name from heshe_admins as a left join heshe_admin_role as b on a.roleid=b.id where a.user='" + user + "' and a.password='" + password + "'", function (list) {
        if (list.length != 0) {
            req.session.user = user;
            req.session.rolename = list[0].name;
            req.session.auths = list[0].auths;
            res.cookie('token', 888888, {maxAge: 60 * 1000 * 60 * 24 * 7});
            res.clearCookie('login_error');
            test.index("UPDATE `heshe_admins` SET lastlogintime='" + moment().format('X') + "',lastloginip='" + req.socket.remoteAddress.replace("::ffff:", "") + "' WHERE `id` = " + list[0].id);
            res.redirect('/home');
        } else {
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
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render('login');
    }
};

exports.index = function (req, res) {
    res.redirect('/login');
};

exports.logout = function (req, res) {
    res.clearCookie('token');
    req.session.destroy();
    res.redirect('/login');
};

exports.home = function (req, res) {
    res.render('home');
};