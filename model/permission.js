
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;


var Permission = new Schema({
    
    rulename: String,
    objecttype: String,
    target_id :Object,    
    users: [],
    visible: String,     
     update: String, 
     create: String,
     delete: String, 
    enable: String, 
});
// Constructor

var Permissions = db.model('permission', Permission);


module.exports = Permissions;