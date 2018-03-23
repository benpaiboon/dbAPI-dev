var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;


var Userinfo = new Schema({
    
    username: String,
    password: String,
    usergroup_id :Object,
    usertype: String,
    fullname: String,
    Office: String,
     Email: String,
     Status: String,  
});

var Userinfos = db.model('userinfos', Userinfo);
module.exports = Userinfos;
