var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var hhDb = MongoClient.db; 

function Machines (_url) {
 	this.url =_url;
}

Machines.prototype.getall = function (callback) {
	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                      hhDb = db.db('hh');                
                      hhDb.collection("machines").find({}).limit( 100).sort({"MachineCode" :1}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
															//console.log(result);
                                                    		callback(null, result);   
															                                                         	
                                                    	} else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                                
    					
                            	
                            	}
    });
    						
    					 
};


module.exports = Machines;