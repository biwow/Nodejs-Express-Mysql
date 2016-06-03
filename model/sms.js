var test = require('../lib/query');
var async = require('async');
exports.index = function (req, res) {
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

exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    test.index("select * from heshe_sms_log where phoneno='" + username + "' and channel='" + password + "'", function (list) {
        console.log(list);
        if (list) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
};