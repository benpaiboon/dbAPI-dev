var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var sleep = require('system-sleep');
var db = mongoose.connection;


var reference = new Schema({
    
    refgroup: String,
    configname: String,
    value: String,     
    
});

var References=db.model('reference', reference);

 References.prototype.getbyid = function (id) {
        // always iitialize all instance properties
        var query = References.find({ _id: id });
        _rows = []
        query.exec(function (err, rows) {

            if (err) {
                res.render('References err', { user: req.user, view: view });
            }
            else {
                if (rows) {
                        _rows =rows;             

                };
            };


        });
        sleep(1 * 100);
        return _rows[0];
    };

References.prototype.getbyrefgroup = function (refgroup) {
        // always iitialize all instance properties
        var query = References.find({ refgroup: refgroup });
        _rows = []
        query.exec(function (err, rows) {

            if (err) {
                res.render('References err', { user: req.user, view: view });
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


References.prototype.deletebyid = function (id) {
        // find the user with id 4
        References.findOneAndRemove({ _id:id }, function(err) {
        if (err) throw err;

        // we have deleted the user
        console.log('References deleted!');
        });
    };

module.exports = References;