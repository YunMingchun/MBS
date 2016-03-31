var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('mbs', server);

db.open(function (err, db) {
    if (!err) {
        console.log('[MongoDb] - mongodb connected.');
    }
});

module.exports = db;