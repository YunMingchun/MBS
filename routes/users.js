var express = require('express');
var router = express.Router();
var User = require('../modules/user');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/api/register', function (req, res, next) {
    var user = {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    };

    User.findByName(user.userName, function (resp) {
        if (!resp) {
            User.create(user, function (resp) {
                res.json({
                    status: 0,
                    userId: resp
                });
            });
        }
        else {
            res.json({
                status: -1,
                msg: '用户名已存在'
            });
        }
    });
});

router.get('/api/login', function (req, res, next) {
    var user = {
        userName: req.query.userName,
        password: req.query.password
    };

    User.findByName(user.userName, function (resp) {
        if (resp) {
            if (md5.update(user.password).digest('hex') == resp.password) {
                res.json({
                    status: 0,
                    userId: resp._id
                });
            }
            else {
                res.json({
                    status: -3,
                    msg: '密码错误'
                });
            }
        }
        else {
            res.json({
                status: -2,
                msg: '用户名不存在'
            });
        }
    });
});

module.exports = router;
