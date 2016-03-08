var db = require('./db');
var ObjectId = require('mongodb').ObjectId;

function Post(post) {
    this.userId = post.userId;
    this.title = post.title;
    this.privacy = post.privacy;
    this.tags = post.tags;
    this.content = post.content;
    this.isPublished = post.isPublished;
    this.createTime = post.createTime;
    this.updateTime = post.updateTime;
};

Post.create = function (post, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('posts').insertOne({
                'inUse': 1,
                'userId': post.userId,
                'title': post.title,
                'privacy': post.privacy,
                'tags': post.tags,
                'content': post.content,
                'isPublished': post.isPublished,
                'createTime': post.createTime
            }, function (err, resp) {
                if (!err) {
                    callback(resp.insertedId);
                    db.close();
                }
            });
        }
    });
};

Post.listByUserId = function (userId, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('posts').find({'userId': userId}).toArray(function (err, resp) {
                if (!err) {
                    callback(resp);
                    db.close();
                }
            });
        }
    });
};

Post.findById = function (postId, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('posts').find({'_id': ObjectId(postId)}).toArray(function (err, resp) {
                if (!err) {
                    callback(resp[0]);
                    db.close();
                }
            });
        }
    });
};

Post.deleteById = function (postId, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('posts').updateOne({'_id': ObjectId(postId)}, {
                $set: {
                    'inUse': 0
                }
            }, function (err, resp) {
                if (!err) {
                    callback(resp);
                    db.close();
                }
            });
        }
    });
};

Post.edit = function (post, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('posts').updateOne({'_id': ObjectId(post.postId)}, {
                $set: {
                    'title': post.title,
                    'privacy': post.privacy,
                    'tags': post.tags,
                    'content': post.content,
                    'updateTime': post.updateTime
                }
            }, function (err, resp) {
                if (!err) {
                    callback(resp);
                    db.close();
                }
            });
        }
    });
};

module.exports = Post;
