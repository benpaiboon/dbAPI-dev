var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var FtFwDb = MongoClient.db; 
var Users =  require('./users.js');


function Datasource (url){	
	this.url = url;	
	
}

Datasource.prototype.getbypath=function  (path,callback) {
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
                               FtFwDb.collection("datasource").find({}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                      
                                                       var datalist =[];
                                                       //console.log('result:' + result);
                                                    	setTimeout(function(){
                                                    		result.forEach(function(_child) {
                                                           		
                                                                datalist=_child.collections;
                                                           // console.log('ArrJoin:' + onecom.html);
                                                            });
                                                       	//console.log('Com__:' + componentlist);
                                                    		callback(null, datalist);    
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

Datasource.prototype.getbyname=function  (collectionname,filters,callback) {
 var curuser =this.username;
 var person = {};
 var _url =this.url;
 	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  	console.log('Connect DB succes.' + collectionname );
            			FtFwDb = db.db('FtFw'); 
                        
            			setTimeout(function(){
                    		
                    		if (FtFwDb==null){
                            	console.log('Not found Database name FtFw!');
                            	callback('Not found Database name FtFw!', null);
                            } else {
                            	 var datarow = {"name":collectionname,"rows":[]}           
                      			FtFwDb.collection(collectionname).find({}).toArray( function(err,result){
                            //   FtFwDb.collection("componnent").find({}).toArray( function(err,result){
                                        		if (err){
                            						console.log(err);
                            						callback(err, null);
                                                } else {
                                                	if(result) { 
                                                       var _HTML ='';
                                                       //console.log('result:' + result);
                                                    	setTimeout(function(){
                                                    		result.forEach(function(_row) {
                                                           		// _HTML = _HTML + _child.HTML.join(',')
                                                            	//console.log('ArrJoin:' + _child.HTML);
                                                            	datarow.rows.push(_row);
                                                            });
                                                        //	console.log('Com__:' + _HTML);
                                                    		callback(null, datarow);    
                                                        }, 500);    
                                                    	
                                                    } else {
                                                        	callback('Not data!!', null);   
                                                        };
                                                    
                                                  
                                                }
                                        	});
                            	}
    						
    						
  						}, 500);     
                       }
         
           });  
};




module.exports = Datasource;