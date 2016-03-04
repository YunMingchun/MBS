var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home', {title: 'MBS'});
});

router.get('/login', function (req, res, next) {
    res.render('user/login', {title: 'Login'});
});

router.get('/register', function (req, res, next) {
    res.render('user/register', {title: 'register'});
});

module.exports = router;
