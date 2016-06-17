var test = require('../lib/mysql_testdb');
var showPage = require('../lib/page');
var async = require('async');
var moment = require('moment');
var pagesize = 20;

exports.index = function (req, res) {
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
            test.index("select * from heshe_sms_log " + where + " order by id asc limit " + (parseInt(page) - 1) * pagesize + "," + pagesize, function (list) {
                done(null, list);
            });
        },
        two: function (done) {
            test.index("SELECT COUNT(*) AS total FROM heshe_sms_log" + where, function (list) {
                done(null, list);
            });
        }
    }, function (error, result) {
        result.one.forEach(function (item) {
            item.receipt_time = parseInt(item.receipt_time) ? parseInt(item.receipt_time) - parseInt(item.send_time) : 'NO';
            item.send_time = moment(item.send_time * 1000).format('Y-MM-DD HH:mm:ss');
        });
        res.render('sms', {
            smslist: result.one,
            page: showPage.show(url, result.two[0].total, pagesize, page),
            channel: req.query.channel,
            phoneno: req.query.phoneno
        });
    })
};