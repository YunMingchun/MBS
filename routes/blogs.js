var express = require('express');
var router = express.Router();
var Post = require('../modules/post');

router.get('/', function (req, res, next) {
    res.render('blog/display');
});

router.get('/add', function (req, res, next) {
    res.render('blog/add');
});

router.get('/list', function (req, res, next) {
    res.render('blog/list');
});

router.get('/display', function (req, res, next) {
    res.render('blog/display');
});

router.get('/edit', function (req, res, next) {
    res.render('blog/edit');
});

router.post('/api/add', function (req, res, next) {
    var post = {
        userId: req.body.userId,
        title: req.body.title,
        privacy: req.body.privacy,
        tags: req.body.tags,
        content: req.body.content,
        isPublished: req.body.isPublished,
        createTime: req.body.createTime,
        abstract: req.body.abstract
    };

    Post.create(post, function (resp) {
        res.json({
            status: 0,
            postId: resp
        });
    });
});

router.post('/api/edit', function (req, res, next) {
    var post = {
        userId: req.body.userId,
        postId: req.body.postId,
        title: req.body.title,
        privacy: req.body.privacy,
        tags: req.body.tags,
        content: req.body.content,
        isPublished: req.body.isPublished,
        updateTime: req.body.updateTime,
        abstract: req.body.abstract
    };

    Post.edit(post, function (resp) {
        res.json({
            status: 0
        });
    });
});

router.post('/api/delete', function (req, res, next) {
    var postId = req.body.postId;
    var userId = req.body.userId;

    Post.deleteById(userId, postId, function (resp) {
        res.json({
            status: 0
        });
    });
});

router.get('/api/list', function (req, res, next) {
    var userId = req.query.userId;
    Post.listByUserId(userId, function (result) {
        res.json({
            status: 0,
            mode: result.mode,
            posts: result.posts
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