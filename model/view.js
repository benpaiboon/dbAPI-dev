var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var FtFwDb = MongoClient.db; 
var Users =  require('./users.js');
var Components =  require('./component.js');


function Views (url){	
	this.url = url;	
}

var getchild =function  (_url,parent,child,callback) {
	var newHTML = '';
	var comHTML = '';
	var _com = new Components(_url);
	setTimeout(function(){
		parent.child.forEach(function(_child) {
    		
        	child.forEach(function(__child) {
             //	console.log('has_child.' + __child._id + ' == ' +  _child); 
            	if (_child.equals(  __child._id)){
                	newHTML=newHTML+__child.HTML;
             		//console.log('newHTML :' +  __child.HTML); 
                }

            });
            

          setTimeout(function(){
       			 _com.getbyview(parent._id, function(err,data) {
                 		if(err) {console.log('getbyview error  ' + err  ); };
            			if(data) {     			comHTML=data};
                     		 
        			})
         			//console.log('comHTML ' + comHTML  );
    		//	console.log('newHTML ' + newHTML  );
                //     +' ' + newHTML
       			
      			}, 500);   
        
        	 
    	});
    /*
                setTimeout(function(){
       			 _com.getbyview(parent._id, function(err,data) {
            			if(data) {
                			comHTML=data;
                         	callback(null,comHTML +' ' + newHTML);
           			 } else {
                     		 callback(null, newHTML);
                     }
                 
        			})
         			//console.log('comHTML ' + comHTML  );
    		//	console.log('newHTML ' + newHTML  );
                //     +' ' + newHTML
       			
      			}, 500);   
    */
    callback(null,comHTML +' ' + newHTML);
     //callback(null, newHTML);
    }, 500);   
	
	  
};


Views.prototype.getbypath=function  (path,callback) {
 var curuser =this.username;
 var person = {};
 var _url =this.url;
//var _com = new Components(_url);
 	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  	console.log('Connect DB succes.' + path );
            			FtFwDb = db.db('FtFw'); 
                       	var _view = FtFwDb.collection("view");   
            			setTimeout(function(){
                    		
                    		if (FtFwDb==null){
                            	console.log('Not found Database name FtFw!');
                            	callback('Not found Database name FtFw!', null);
                            } else {
                            	            
                      			 FtFwDb.collection("view").find({"path":path}).toArray( function(err,result){
                               //   FtFwDb.collection("view").find({}).toArray( function(err,result){
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
    						
    						
  						}, 500);     
                       }
         
           });  
};



Views.prototype.getbypathhtml=function  (path,callback) {
 var curuser =this.username;
 var person = {};
 var _url =this.url;
//var _com = new Components(_url);
 	MongoClient.connect(this.url, function(err, db) {            
            if (err) {              		 
            		  console.log('Not Connect DB!.' +  err);               		  
                    callback(err,null);
            } else {
                
                	  	console.log('Connect DB succes.' + path );
            			FtFwDb = db.db('FtFw'); 
                       	var _view = FtFwDb.collection("view");   
            			setTimeout(function(){
                    		
                    		if (FtFwDb==null){
                            	console.log('Not found Database name FtFw!');
                            	callback('Not found Database name FtFw!', null);
                            } else {
                            	            
                      			 FtFwDb.collection("view").find({"path":path}).toArray( function(err,result){
                               //   FtFwDb.collection("view").find({}).toArray( function(err,result){
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
    						
    						
  						}, 500);     
                       }
         
           });  
};


 Views.prototype.genHTML=function  (data,callback) {
    var _url = this.url
     
var _com = new Components(_url);
     var _main = data.filter(data => data.level ===0);
 	 var _view_1 = data.filter(data => data.level ===1);
 	var _view_2 = data.filter(data => data.level ===2);
 	var _view_3 = data.filter(data => data.level ===3);
	var _view_4 = data.filter(data => data.level ===4);
 	var _view_5 = data.filter(data => data.level ===5);
 	var _view_6 = data.filter(data => data.level ===6);
 	var _view_7 = data.filter(data => data.level ===7);
 
 	_view_1.sort(function (a, b) { 	return a.seq - b.seq; 	});
	 _view_2.sort(function (a, b) { 	return a.seq - b.seq; 	});
 	_view_3.sort(function (a, b) { 	return a.seq - b.seq; 	});
 	_view_4.sort(function (a, b) { 	return a.seq - b.seq; 	});
 	_view_5.sort(function (a, b) { 	return a.seq - b.seq; 	});
 	_view_6.sort(function (a, b) { 	return a.seq - b.seq; 	});
	 _view_7.sort(function (a, b) { 	return a.seq - b.seq; 	});
   
 	setTimeout(function(){
    	_view_2.forEach(function(_child) {
 			getchild(_url,_child,_view_3, function(err,NewHTML){
        		if(NewHTML) {
                			var comHTML ='';
                	     setTimeout(function(){
       				
         			//console.log('comHTML ' + comHTML  );
    		//	console.log('newHTML ' + newHTML  );
                //     +' ' + newHTML
       			_child.HTML=_child.HTML.replace(/##child_component##/g, comHTML + NewHTML );
      					}, 500);   
            	//	_child.HTML=_child.HTML.replace(/##child_component##/g,NewHTML );
               	//	 console.log('_view_2' + NewHTML);
            		}
        		});
              })

     		setTimeout(function(){
    		_view_1.forEach(function(_child) {
 				getchild(_url,_child,_view_2, function(err,NewHTML){
        			if(NewHTML) {
                    			var comHTML ='';
                	     setTimeout(function(){
       				
         			//console.log('comHTML ' + comHTML  );
    		//	console.log('newHTML ' + newHTML  );
                //     +' ' + newHTML
       			_child.HTML=_child.HTML.replace(/##child_component##/g, comHTML + NewHTML );
      					}, 500);   
            	
            	//		_child.HTML=_child.HTML.replace(/##child_component##/g,NewHTML );
                	//	console.log('_view_1' + NewHTML);
            			}
        			});
              	})
            	setTimeout(function(){
    			var mainHTML = '';	 
 				_main.forEach(function(_child) {
 				getchild(_url,_child,_view_1, function(err,NewHTML){
        			if(NewHTML) {
                    			var comHTML ='';
                	     setTimeout(function(){
       				
    		//	console.log('newHTML ' + newHTML  );
                //     +' ' + newHTML
       				mainHTML=_child.HTML.replace(/##child_component##/g, NewHTML );
                         	callback(null,mainHTML);
      					}, 500);   
          
                    
            		//	mainHTML =_child.HTML.replace(/##child_component##/g,NewHTML );
                	//	console.log('mainHTML ' + NewHTML);
                    //	console.log('_main' + mainHTML);  
                 	//	callback(null,mainHTML);
                    
            			}
        			});
              	})
              	 
                
    		}, 500);  
            
    	}, 500);  
    
    
    }, 500);   
   
 
  //console.log('_view_1' + _view_1);
  
  
/*
   console.log(_main);
 console.log(_view_1);
 console.log(_view_2);
 console.log(_view_3);
 console.log(_view_4);
 console.log(_view_5);
 console.log(_view_6);
 console.log(_view_7);
 */

 };



module.exports = Views;