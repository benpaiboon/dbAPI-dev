var mongoose = require('mongoose');
var sleep = require('system-sleep');
var Schema = mongoose.Schema;
var Users = require('./users.js');

//var passportLocalMongoose = require('passport-local-mongoose');

var db = mongoose.connection;
var _rows = [];  

var Task = new Schema({
    
    name: String,
    ProjectId :String,
    userId :String, 
    typeId :String,  
    description: String, 
    begindo: Date,
    enddo: Date,
    status: String,  
    visiable:[],
});

var Tasks=db.model('task', Task);
 
Tasks.prototype.getall = function () {
    // always iitialize all instance properties
    var query = Tasks.find({});
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



    Tasks.prototype.deletebyid = function (id) {
            // find the user with id 4
            Tasks.findOneAndRemove({ _id:id }, function(err) {
            if (err) throw err;

            // we have deleted the user
            console.log('User deleted!');
            });
        };

    Tasks.prototype.deletebyid = function (id) {
            // find the user with id 4
            Tasks.findOneAndRemove({ _id:id }, function(err) {
            if (err) throw err;

            // we have deleted the user
            console.log('User deleted!');
            });
        };
                          


    Tasks.prototype.getbyid = function (id) {
        // always iitialize all instance properties
        var query = Tasks.find({ _id: id });
        _rows = []
        query.exec(function (err, rows) {

            if (err) {
                res.render('Todos err', { user: req.user, view: view });
            }
            else {
                if (rows) {
                        _rows =rows;               
                };
            };


        });
        sleep(1 * 100);
        return _rows;
    };

module.exports = Tasks;