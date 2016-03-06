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

router.get('/display', function (req, res, next) {
    res.render('blog/display');
});

router.post('/api/add', function (req, res, next) {
    var post = {
        userId: req.body.userId,
        title: req.body.title,
        privacy: req.body.privacy,
        tags: req.body.tags,
        content: req.body.content,
        isPublished: req.body.isPublished,
        createTime: req.body.createTime
    };

    Post.create(post, function (resp) {
        res.json({
            status: 0,
            postId: resp
        });
    });
});

router.get('/api/list', function (req, res, next) {
    var userId = req.query.userId;
    Post.listByUserId(userId, function (resp) {
        res.json({
            status: 0,
            posts: resp
        });
    })
});

router.get('/api/display', function (req, res, next) {
    var postId = req.query.postId;
    Post.findById(postId, function (resp) {
        res.json({
            status: 0,
            post: resp
        });
    });
});

module.exports = router;