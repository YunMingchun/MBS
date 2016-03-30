var db = require('./db');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

function User(user) {
    this.userName = user.userName;
    this.password = user.password;
    this.email = user.email;
};

User.create = function (user, callback) {
    db.collection('users').insertOne({
        'userName': user.userName,
        'password': crypto.createHash('md5').update(user.password).digest('hex'),
        'email': user.email
    }, function (err, resp) {
        if (!err) {
            callback(resp.insertedId);
        }
    });
};

User.findByName = function (userName, callback) {
    db.collection('users').find({userName: userName}).toArray(function (err, resp) {
        if (!err) {
            callback(resp[0]);
        }
    });
};

User.findById = function (userId, callback) {
    db.collection('users').find({'_id': ObjectId(userId)}).toArray(function (err, resp) {
        if (!err) {
            callback(resp[0]);
        }
    });
};

module.exports = User;
