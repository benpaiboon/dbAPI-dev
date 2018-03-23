var UserGroup = require('./usergroup.js');
var Users = require('./users.js');
var sleep = require('system-sleep');
var mongoose = require('mongoose');
// Constructor

var _rows = [];  

    function UserGroups () {
   
        // always iitialize all instance properties

        
    }
    //// Get the student Name
//    UserGroups.prototype.GetgroupById = function (id) {
//        // always iitialize all instance properties
//        var query = UserGroup.find({ _id: id });

//        query.exec(function (err, rows) {

//            if (err) {
//                res.render('err', { user: req.user, view: view });
//            }
//            else {
//                if (rows) {


//                    rows.forEach(function (obj) {
//                        if (obj) {
//                            this.groupname = obj.groupname;
//                            this.description = obj.description;
//                            this.useringroup = obj.useringroup;
//                            this.permition = obj.permition;
//                            this.Status = obj.Status;
//                        }

//                    });



//                };
//            };


//        });

//    }

    UserGroups.prototype.getgrouplist = function () {
        // always iitialize all instance properties
        var query = UserGroup.find({});
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
        sleep(1 * 1000);
        return _rows;
    };


    UserGroups.prototype.deletebyid = function (id) {
            // find the user with id 4
            UserGroup.findOneAndRemove({ _id:id }, function(err) {
            if (err) throw err;

            // we have deleted the user
            console.log('User deleted!');
            });
        };

                             


    UserGroups.prototype.getgroupbyid = function (id) {
        // always iitialize all instance properties
        var query = UserGroup.find({ _id: id });
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
                            var useringroup = [];
                             _obj.useringroup = [];
                            var query_sub = Users.find({ usergroup_id: _obj._id });
                            query_sub.exec(function (err, sub_rows) {

                                if (err) {
                                    res.render('getuser in group err', { user: req.user, view: view });
                                }
                                else {
                                    if (sub_rows) {
                                        sub_rows.forEach(function (sub_obj) {
                                            if (sub_obj) {
                                                var _sub_obj = sub_obj;                                               
                                                 sleep(1 * 1000);
                                                _obj.useringroup.push(_sub_obj)

                                            }

                                        });



                                    };
                                };


                            });
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

  
    UserGroups.prototype.Getgroupname = function () {
        return 'groupname';
       // return this.groupname;
    };

//    UserGroups.prototype.getrows = function () {
//        var query = UserGroup.find();

//        query.exec(function (err, rows) {

//            if (err) {
//                res.render('err', { user: req.user, view: view });
//            }
//            else {
//                if (rows) {
//                    this.rows = rows
//                    // return rows
//                    rows.forEach(function (obj) {
//                        if (obj) {
//                            this.rows.push(obj)
//                            //                            this.groupname = obj.groupname;
//                            //                            this.description = obj.description;
//                            //                            this.useringroup = obj.useringroup;
//                            //                            this.permition = obj.permition;
//                            //                            this.Status = obj.Status;
//                            console.log(obj);
//                        }

//                    });



//                };
//            };
//           // return this.rows;

//        });
//        

//    };

//    UserGroups.prototype.Getdescription = function () {
//        return this.description;

//    };
//    UserGroups.prototype.useringroup = function () {
//        return this.useringroup;

//    };
//    UserGroups.prototype.permition = function () {
//        return this.permition;

//    };
//    UserGroups.prototype.Status = function () {
//        return this.Status;

//    };

////// Gets the student Age
////Student.prototype.getStudentAge = function () {
////    return this.age;
////};

////// Gets the student's ID
////Student.prototype.getStudentId = function () {
////    return this.id;
////};
////// export the class
    module.exports = UserGroups;
 
 