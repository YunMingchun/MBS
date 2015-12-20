var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/christmas', function(req, res, next) {
  res.render('other/christmas', {title: 'Merry Christmas'});
});

module.exports = router;
