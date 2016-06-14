var test = require('../lib/mysql_testdb');
var showPage = require('../lib/page');
var async = require('async');
var moment = require('moment');
var pagesize = 20;

exports.index = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
    }
    var page = req.query.page ? req.query.page : 1; //获取当前页数，如果没有则为1
    var url = req.originalUrl; //获取当前url，并把url中page参数过滤掉
    url = url.replace(/([?&]*)page=([0-9]+)/g, '');
    if (/[?]+/.test(url)) {
        url += '&';
    } else {
        url += '?';
    }
    var where = ' WHERE 1 ';
    if (req.query.channel) {
        where += " and channel='" + req.query.channel + "' ";
    }

    if (req.query.phoneno) {
        where += " and phoneno='" + req.query.phoneno + "' ";
    }

    async.series({
        one: function (done) {
            test.index("select * from heshe_admins " + where + " order by id asc limit " + (parseInt(page) - 1) * pagesize + "," + pagesize, function (list) {
                done(null, list);
            });
        },
        two: function (done) {
            test.index("SELECT COUNT(*) AS total FROM heshe_admins" + where, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        result.one.forEach(function (item) {
            item.lastlogintime = moment(item.lastlogintime * 1000).format('Y-MM-DD HH:mm:ss');
        });
        res.render('user', {
            user: req.session.user,
            smslist: result.one,
            page: showPage.show(url, result.two[0].total, pagesize, page),
        });
    })
};

exports.add = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
    }
    var user = req.body.user;
    var password = req.body.password;
    var phoneno = req.body.phoneno;
    var email = req.body.email;
    var items = 'data';


    async.series({
        one: function (done) {
            test.index("INSERT INTO `heshe_admins` (`user`, `password`,`phoneno`,`email`,`items`) VALUES ('" + user + "', '" + password + "', '" + phoneno + "', '" + email + "', '" + items + "')", function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/user');
    });
};

exports.edit = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
    }
    var id = req.query.id; //获取当前页数，如果没有则为1

    async.series({
        one: function (done) {
            test.index("select * from heshe_admins where id = " + id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.render('user_edit', {
            user: req.session.user,
            role: result.one[0]
        });
    })
};

exports.update = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
    }
    var id = req.body.id;
    var name = req.body.name;
    var auths = req.body.auths;

    async.series({
        one: function (done) {
            test.index("UPDATE `heshe_admins` SET `name` = '" + name + "',`auths` = '" + auths + "' WHERE `id` = " + id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/user');
    });
};

exports.delete = function (req, res) {
    if (req.session.user === undefined) {
        res.redirect('/login');
    }
    var id = req.query.id;

    async.series({
        one: function (done) {
            test.index("DELETE FROM `heshe_admins` WHERE `id` = " + id, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        res.redirect('/user');
    });
};