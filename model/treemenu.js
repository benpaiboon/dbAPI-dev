var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var sleep = require('system-sleep');
var db = mongoose.connection;


var Treemenu = new Schema({
    
    viewname: String,
    menuname: String, 
    menudata :[],
});
// Constructor

var Treemenus = db.model('treemenu', Treemenu);

    
Treemenus.getbytreename = function ( treename) {
    var query = Treemenus.find({ name:treename });  
    var doc =[];
        query.exec(function (err, rows) {

            if (err) {
                res.render('get list menu info err' );
            }
            else {
                if (rows) {
                    rows.forEach(function (obj) {
                        if (obj) {

                            Object.getOwnPropertyNames(obj ).forEach(
                                function (val, idx,  array) {
                                    if (val='_doc' ){
                                        if (idx.toString(36)=='0'){
                                        var menu =obj[val];
                                         Object.getOwnPropertyNames(menu ).forEach(
                                        function (val2, idx2,  array2) {
                                            if (val2='menulist' ){
                                                if (idx2.toString(36)=='0'){
                                                   // console.log(val2 + ' -> ' + idx.toString(36) + ' -> ' + idx2.toString(36) );
                                                
                                                 doc.push(menu[val2]) ;
                                                }
                                                

                                               
                                            }
                                            
                                        });
                                       
                                    }
                                    }
                                    
                                }
                            );
                           // var _obj = JSON.parse(obj);
                           // var menu = _obj;
                        //    obj.forEach(function (list) {
                        //        if(list){
                        //     console.log('tree:' + JSON.stringify(list) )
                        // //     menu.forEach(function (list) {
                        // //          if (list) {
                        // //              console.log('tree:' + JSON.stringify(list) )
                        // //             return      JSON.stringify(list) 
                        // //          }
                                 

                        // //       });   
                        //         }
                                
                        //    } );  
                            
                           
                          }
                    });
                };
            };
        }); 
        sleep(1 * 1000);
         return      doc;    
}

module.exports = Treemenus;