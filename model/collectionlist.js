
var sleep = require('system-sleep');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;

  
// Constructor

var colloctionlists = function(){
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log(names);
    
        return JSON.stringify(names)  ;
      }
     
    });
}
   

module.exports = colloctionlists;