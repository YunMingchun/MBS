var express = require('express');
var router = express.Router();
var User = require('../modules/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/register', function(req, res, next) {
  var user = {
    userName: req.body.userName,
    password: req.body.password
  };
  User.create(user, function(resp){
    res.json({
      status: 0,
      userId: resp
    });
  });
});

module.exports = router;
