/**
 * Created by ymc on 1/26/16.
 */

var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect : true});
var db = new mongodb.Db('mbs', server);

module.exports = db;