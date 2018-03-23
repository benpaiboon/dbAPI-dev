var mongoose = require('mongoose');
var sleep = require('system-sleep');
var Schema = mongoose.Schema;
var Users = require('./users.js');

//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;
var _rows = [];  

var Office = new Schema({
    
    officename: String,
    description: String,
    officetype: String,  
    location :String,   
     Status: String,  
     permissioncode: String,  
});

var Offices=db.model('office', Office);
 
Offices.prototype.getall = function () {
    // always iitialize all instance properties
    var query = Offices.find({});
    _rows = [];
    query.exec(function (err, rows) {

        if (err) {
            res.render('err', { user: req.user, view: view });
        }
        else {
            if (rows) {


                rows.forEach(function (obj) {
                    if (obj) {
                        _rows.push(obj)
                    }

                });



            };
        };


    });
    sleep(1 * 100);
    return _rows;
};



    Offices.prototype.deletebyid = function (id) {
            // find the user with id 4
            Offices.findOneAndRemove({ _id:id }, function(err) {
            if (err) throw err;

            // we have deleted the user
            console.log('User deleted!');
            });
        };

                             


    Offices.prototype.getbyid = function (id) {
        // always iitialize all instance properties
        var query = Offices.find({ _id: id });
        _rows = []
        query.exec(function (err, rows) {

            if (err) {
                res.render('getgroupbyid err', { user: req.user, view: view });
            }
            else {
                if (rows) {


                    rows.forEach(function (obj) {
                        if (obj) {
                            var _obj = obj;
                /*            var useringroup = [];
                             _obj.useringroup = [];
                            var query_sub = Users.find({ office: _obj.officename });
                            query_sub.exec(function (err, sub_rows) {

                                if (err) {
                                    res.render('getuser in office err', { user: req.user, view: view });
                                }
                                else {
                                    if (sub_rows) {
                                        sub_rows.forEach(function (sub_obj) {
                                            if (sub_obj) {
                                                var _sub_obj = sub_obj;                                               
                                                 sleep(1 * 1000);
                                                _obj.userinoffice.push(_sub_obj)

                                            }

                                        });



                                    };
                                };


                            });*/
                            sleep(1 * 1000);
                            _rows.push(_obj)
                            // useringroup = Users.getuserbygroup(_obj.groupname);
                        }

                    });



                };
            };


        });
        sleep(1 * 1000);
        return _rows[0];
    };




module.exports = Offices;