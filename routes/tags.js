var express = require('express');
var router = express.Router();
var Tag = require('../modules/tag');

router.get('/api/list', function (req, res, next) {
    var userId = req.query.userId;
    Tag.findByUserId(userId, function (resp) {
        res.json({
            status: 0,
            tags: resp
        });
    });
});


module.exports = router;