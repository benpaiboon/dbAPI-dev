var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var FtFwDb = MongoClient.db; 
var Users =  require('./users.js');


function Components (url){	
	this.url = url;	
	
}
Components.prototype.getbypath=function  (path,callback) {
 var curuser =this.username;
 var person = {};
 var _url =this.url;
 
 	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  	console.log('Connect DB succes.' + path );
            			FtFwDb = db.db('FtFw'); 
                        
            			setTimeout(function(){
                    		
                    		if (FtFwDb==null){
                            	console.log('Not found Database name FtFw!');
                            	callback('Not found Database name FtFw!', null);
                            } else {
                            	            
                      			//FtFwDb.collection("component").find({"path": path }).toArray( function(err,result){
                               FtFwDb.collection("componnent").find({}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                       var _HTML ='';
                                                       var componentlist =[];
                                                       //console.log('result:' + result);
                                                    	setTimeout(function(){
                                                    		result.forEach(function(_child) {
                                                           		// _HTML = _HTML + _child.HTML.join(',')
                                                            	
                                                            	_HTML = _HTML + _child.HTML.join(',');
                                                               var onecom = {"comtag":_child.tag_id,"HTML": _HTML};
                                                                componentlist.push(onecom);
                                                            console.log('ArrJoin:' + onecom.html);
                                                            });
                                                       	console.log('Com__:' + componentlist);
                                                    		callback(null, componentlist);    
                                                        }, 500);    
                                                    	
                                                    } else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                            	}
    						
    						
  						}, 500);     
                       }
         
           });  
};

Components.prototype.getbyview=function  (view_id,callback) {
 var curuser =this.username;
 var person = {};
 var _url =this.url;
 	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  	console.log('Connect DB succes.' + view_id );
            			FtFwDb = db.db('FtFw'); 
                        
            			setTimeout(function(){
                    		
                    		if (FtFwDb==null){
                            	console.log('Not found Database name FtFw!');
                            	callback('Not found Database name FtFw!', null);
                            } else {
                            	            
                      			FtFwDb.collection("component").find({"parent_id": new ObjectID(view_id) }).toArray( function(err,result){
                            //   FtFwDb.collection("componnent").find({}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                       var _HTML ='';
                                                       //console.log('result:' + result);
                                                    	setTimeout(function(){
                                                    		result.forEach(function(_child) {
                                                           		// _HTML = _HTML + _child.HTML.join(',')
                                                            	//console.log('ArrJoin:' + _child.HTML);
                                                            	_HTML = _HTML + _child.HTML.join(',');
                                                            });
                                                        //	console.log('Com__:' + _HTML);
                                                    		callback(null, _HTML);    
                                                        }, 500);    
                                                    	
                                                    } else {
                                                        	callback('Not found!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                            	}
    						
    						
  						}, 500);     
                       }
         
           });  
};




module.exports = Components;