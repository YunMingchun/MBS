var db = require('./db');

function Post(post) {
    this.userId = post.userId;
    this.title = post.title;
    this.privacy = post.privacy;
    this.tags = post.tags;
    this.content = post.content;
    this.isPublished = post.isPublished;
};

Post.create = function (post, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('posts').insertOne({
                'userId': post.userId,
                'title': post.title,
                'privacy': post.privacy,
                'tags': post.tags,
                'content': post.content,
                'isPublished': post.isPublished
            }, function (err, resp) {
                if (!err) {
                    callback(resp.insertedId);
                    db.close();
                }
            });
        }
    });
};

module.exports = Post;
