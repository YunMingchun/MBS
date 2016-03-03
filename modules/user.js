/**
 * Created by ymc on 1/26/16.
 */

var db = require('./db');
var crypto = require('crypto');

function User(user) {
    this.userName = user.userName;
    this.password = user.password;
    this.email = user.email;
};

User.create = function (user, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('users').insertOne({
                'userName': user.userName,
                'password': crypto.createHash('md5').update(user.password).digest('hex'),
                'email': user.email
            }, function (err, resp) {
                if (!err) {
                    callback(resp.insertedId);
                    db.close();
                }
            });
        }
    });
};

User.findByName = function (userName, callback) {
    db.open(function (err, db) {
        if (!err) {
            db.collection('users').find({userName: userName}).toArray(function (err, resp) {
                if (!err) {
                    callback(resp[0]);
                    db.close();
                }
            });
        }
    });
};

module.exports = User;
