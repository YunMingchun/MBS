/**
 * Created by ymc on 1/26/16.
 */

var db = require('./db');

function User (user) {
    this.userName = user.userName;
    this.password = user.password;
};

User.create = function (user, callback) {
    db.open(function(err, db){
        if(!err){
            db.collection('users').insertOne({
                'userName': user.userName,
                'password': user.password
            }, function(err, resp){
                if(!err){
                    callback(resp.insertedId);
                    db.close();
                }
            });
        }
    });
};

module.exports = User;
