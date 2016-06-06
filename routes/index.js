var express = require('express');
var router = express.Router();
var sms = require('../model/sms');

/* GET home page. */
router.get('/', sms.index);

router.get('/login', sms.Glogin);

router.post('/login', sms.Plogin);

router.get('/home', sms.home);

module.exports = router;
