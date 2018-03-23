var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;


var UserGroup = new Schema({
    
    groupname: String,
    description: String,
    useringroup: Object,
    permition: Object,
     Status: String,  
});



module.exports = db.model('usergroup', UserGroup);