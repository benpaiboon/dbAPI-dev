var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var hhDb = MongoClient.db; 

function Users (_url) {
 	this.url =_url;
}

Users.prototype.getall = function (callback) {
	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                      hhDb = db.db('hh');                
                      hhDb.collection("users").find({}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                    		callback(null, result);                                                            	
                                                    	} else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                                
    					
                            	
                            	}
    });
    						
    					 
};

Users.prototype.resetpassword = function (callback) {
	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                      hhDb = db.db('hh');  
					  hhDbUpdate = db.db('hh');              
                      hhDb.collection("users").find({}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                    		     result.forEach(function(element) {
																	 
																	 hhDbUpdate.collection("users").updateOne({_id:element._id},{$set:{password:element.username}},function(err2,res) {
																			if (err) throw err;
																				console.log("1 document updated");
																	 })
																 }, this); 
																 callback(null, result[0]);                                                       	
                                                    	} else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                                
    					
                            	
                            	}
    });
    						
    					 
};

Users.prototype.getbyname = function (username, callback) {
	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                      hhDb = db.db('hh');                
                      hhDb.collection("users").find({"username":username}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                    		callback(null, result);                                                            	
                                                    	} else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                                
    					
                            	
                            	}
    });
    						
    					 
};

Users.prototype.getbyid = function (userid , callback) {
	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  console.log('Connect DB succes.' + curuser);
                      hhDb = db.db('hh');                
                      hhDb.collection("users").find({"username":curuser} , function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                    		callback(null, result);                                                            	
                                                    	} else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                                
    					
                            	
                            	}
    });
    						
    					 
};

Users.prototype.addbyname = function (name , callback) {
	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  console.log('Connect DB succes.' + curuser);
                      hhDb = db.db('hh');                
                      hhDb.collection("users").find({"username":curuser} , function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                    		callback(null, result);                                                            	
                                                    	} else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                                
    					
                            	
                            	}
    });
    						
    					 
};

module.exports = Users;