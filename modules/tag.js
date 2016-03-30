var db = require('./db');
var ObjectId = require('mongodb').ObjectId;

function Tag(tag) {
    this.userId = tag.userId;
    this.name = tag.name;
};

Tag.create = function (userId, tags, callback) {
    Tag.findByUserId(userId, function (tagsExit) {
        var tagsArr = tags.split(',');
        var tagsJson = [];
        for (var i = 0; i < tagsArr.length; i++) {
            if (!isInArr(tagsArr[i], tagsExit)) {
                tagsJson.push({
                    userId: userId,
                    name: tagsArr[i]
                });
            }
        }

        db.collection('tags', function (err, collection) {
            collection.insertMany(tagsJson, function (err, resp) {
                if (!err) {
                    callback(resp.insertedCount);
                }
            })
        });
    });
};

Tag.findByName = function (tagName, callback) {
    db.collection('tags').find({'name': tagName}).toArray(function (err, resp) {
        if (!err) {
            callback(resp[0]);
        }
    });
};

Tag.findByUserId = function (userId, callback) {
    db.collection('tags').find({'userId': userId}).toArray(function (err, resp) {
        if (!err) {
            callback(resp);
        }
    });
};

module.exports = Tag;

//Helper
function isInArr(item, array) {
    for (var i = 0; i < array.length; i++) {
        if (item == array[i].name) {
            return true;
        }
    }
    if (i == array.length) {
        return false;
    }
}