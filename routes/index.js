var express = require('express');
var router = express.Router();
var sms = require('../model/sms');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', sms.login);

module.exports = router;
