var sleep = require('system-sleep');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var FtFwDb = MongoClient.db; 


function Sessions (username,password,port){
	this.username = username;
	this.password =password;
	this.port =port;
	this.url = 'mongodb://'+ username + ':' + password + '@localhost:' + port +'/';
	this.sessionDB ={};
	this.views ={};
	this.error =[];
}



Sessions.prototype.conecting=function  () {
 
 	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    this.error.push(err); 
            } else {
                
                	  console.log('Connect DB succes.');
                     FtFwDb = db.db('FtFw');        
                	 
             		 var _session = FtFwDb.collection("session");
              		 var _user = FtFwDb.collection("user").find({"username":username});
            		
            
                       _session.insert(session, {w:1}, function(err, inserted) {
                       		if(err){
                            	    this.error.push(err); 
                            } else {
                            	if (_user){                                	 
                               		 this.sessionDB = inserted.save({"userid":_user.username});
                                } else {
                                	var newuser = FtFwDb.collection("user") ;
                                	var _newuser = {"username": username, "port": port };
                                    newuser.insert(_newuser, {w:1}, function(err, user_inserted) {
                                  			if(err){
                                            		    this.error.push(err); 
                                            } else {
                                            	 this.sessionDB= inserted.save({"userid":user_inserted.username});
                                            }
                                            
                                  });
                            		
                                }
                            
                                
                            	
                            }
                         });
              		
                          
              
             
            }
         
           });  
};
	
 



module.exports = Sessions;