 
var fsx = require('fs-extra');
//var passportLocalMongoose = require('passport-local-mongoose');


var _rows = [];  

var fsobj =  Object; 
 
fsobj.getroot = function (www) {
    // always iitialize all instance properties
    var _root =[];

    
    fsx.readdir( www, function(err, filenames) {
        
        if (err) {
            //console.log(err);
            return err ;
            } else {
                filenames.forEach(function(filename) {
                            //console.log(filename);
                        fsx.stat(www + '\\' + filename , function (err,stats) {
                            var fileinfo = { };
                            if ( stats.isFile()) {
                                 fileinfo = {"name":filename ,"type": 'FILE' ,"extention": filename.split('.',10)[1]  };
                                 //console.log(fileinfo);
                            } 

                            if ( stats.isDirectory()) {
                                 fileinfo = {"name":filename ,"type": 'DIR' ,"extention": ''  };
                                 //console.log(fileinfo);
                            }                           
                            _root.push(fileinfo);
                        } )  
                            
                        //console.log(_select);
                        });
            }
       
       });

       // sleep(1 * 100);
        return _root;
    };

 
fsobj.AddDir = function (www) {
    // always iitialize all instance properties
    var _root =['DOC','IMAGE',''];

    
    fsx.readdir( www, function(err, filenames) {
        
        if (err) {
            console.log(err);
            return;
            } else {
                filenames.forEach(function(filename) {
                        //console.log(filename);
                    _root.push(filename);
                    //console.log(_select);
                    });
            }
       
       });

       // sleep(1 * 100);
        return _root;
    };


module.exports = fsobj;