var express = require('express');
var router = express.Router();
var login = require('../model/login');
var sms = require('../model/sms');
var user = require('../model/user');
var role = require('../model/role');

/* login */
router.get('/', login.index);
router.get('/login', login.Glogin);
router.post('/login', login.Plogin);
router.get('/logout', login.logout);
router.get('/home', login.home);

/* 短信管理 */
router.get('/sms', sms.index);

/* 后台用户 */
router.get('/user', user.index);
router.post('/addUser', user.add);
router.get('/editUser', user.edit);
router.post('/updateUser', user.update);
router.get('/delUser', user.delete);

/* 角色管理 */
router.get('/role', role.index);
router.post('/addRole', role.add);
router.get('/editRole', role.edit);
router.post('/updateRole', role.update);
router.get('/delRole', role.delete);

module.exports = router;