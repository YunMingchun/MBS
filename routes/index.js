var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('user/login', {title: 'Login'});
});

router.get('/register', function (req, res, next) {
    res.render('user/register', {title: 'register'});
});

router.get('/home', function (req, res, next) {
    res.render('home', {title: 'home'});
});

module.exports = router;
