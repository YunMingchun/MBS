var express = require('express');
var router = express.Router();
var Post = require('../modules/post');

router.get('/add', function (req, res, next) {
    res.render('blog/add');
});

router.get('/recommend', function (req, res, next) {
    res.render('blog/recommend');
});

router.get('/list', function (req, res, next) {
    res.render('blog/list');
});

router.post('/api/add', function (req, res, next) {
    var post = {
        userId: req.body.userId,
        title: req.body.title,
        privacy: req.body.privacy,
        tags: req.body.tags,
        content: req.body.content,
        isPublished: req.body.isPublished
    };

    Post.create(post, function (resp) {
        res.json({
            status: 0,
            postId: resp
        });
    });
});

module.exports = router;