var db = require('./db');
var ObjectId = require('mongodb').ObjectId;
var Tag = require('./tag');

function Post(post) {
    this.userId = post.userId;
    this.title = post.title;
    this.privacy = post.privacy;
    this.tags = post.tags;
    this.content = post.content;
    this.isPublished = post.isPublished;
    this.createTime = post.createTime;
    this.updateTime = post.updateTime;
    this.abstract = post.abstract;
};

Post.create = function (post, callback) {
    db.collection('posts').insertOne({
        'inUse': 1,
        'userId': post.userId,
        'title': post.title,
        'privacy': post.privacy,
        'tags': post.tags,
        'content': post.content,
        'isPublished': post.isPublished,
        'createTime': post.createTime,
        'abstract': post.abstract
    }, function (err, resp) {
        if (!err) {
            callback(resp.insertedId);

            Tag.create(post.userId, post.tags, function (count) {
                console.log('Tag.create count:' + count);
            });
        }
    });
};

Post.listByUserId = function (userId, callback) {
    db.collection('posts').find({'userId': userId}).toArray(function (err, resp) {
        if (!err) {
            callback(resp);
        }
    });
};

Post.findById = function (postId, callback) {
    db.collection('posts').find({'_id': ObjectId(postId)}).toArray(function (err, resp) {
        if (!err) {
            callback(resp[0]);
        }
    });
};

Post.deleteById = function (postId, callback) {
    db.collection('posts').updateOne({'_id': ObjectId(postId)}, {
        $set: {
            'inUse': 0
        }
    }, function (err, resp) {
        if (!err) {
            callback(resp);
        }
    });
};

Post.edit = function (post, callback) {
    db.collection('posts').updateOne({'_id': ObjectId(post.postId)}, {
        $set: {
            'title': post.title,
            'privacy': post.privacy,
            'tags': post.tags,
            'content': post.content,
            'updateTime': post.updateTime,
            'abstract': post.abstract
        }
    }, function (err, resp) {
        if (!err) {
            callback(resp);
        }
    });
};

module.exports = Post;
