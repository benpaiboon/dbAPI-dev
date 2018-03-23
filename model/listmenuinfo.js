
var sleep = require('system-sleep');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;


var Listmenuinfo = new Schema({
    
    viewname: String,
    menuname: String, 
    menudata :[],
});
// Constructor

var Listmenuinfos = db.model('listmenuinfo', Listmenuinfo);

    
Listmenuinfos.prototype.getbyviewname = function (userid , viewname) {
    var query = Listmenuinfos.find({ userid: userid,viewname:viewname });  
        query.exec(function (err, rows) {

            if (err) {
                res.render('get list menu info err' );
            }
            else {
                if (rows) {
                    rows.forEach(function (obj) {
                        if (obj) {
                            var _obj = obj;
 
                            sleep(1 * 1000);
                            _rows.push(_obj)                           
                        }
                    });
                };
            };
        });   
}

module.exports = Listmenuinfos;