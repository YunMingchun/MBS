var db = require('./db');
var ObjectId = require('mongodb').ObjectId;

function Tag(tag) {
    this.userId = tag.userId;
    this.name = tag.name;
};

Tag.create = function (tag, callback) {
    Tag.findByName(tag.name, function (resp) {
        if (!resp) {
            db.open(function (err, db) {
                if (!err) {
                    db.collection('tags').insertOne({
                        'userId': tag.userId,
                        'name': tag.name
                    }, function (err, resp) {
                        if (!err) {
                            callback(resp.insertedId);
                            db.close();
                        }
                    });
                }
            });
        }
    });
};

Tag.findByName = function (tagName, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('tags').find({'name': tagName}).toArray(function (err, resp) {
                if (!err) {
                    callback(resp[0]);
                    db.close();
                }
            });
        }
    });
};

module.exports = Tag;
