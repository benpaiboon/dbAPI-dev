var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var HHDb = MongoClient.db;
var Users = require('./users.js');
//var Views =  require('./view.js');
var Components = require('./component.js');

function Sessions(username, password, port) {
	this.username = username;
	this.password = password;
	this.port = port;
	this.url = 'mongodb://SuperUser:passw0rd@db.zerp.co.th:27777';
	this.sessionDB = HHDb;
	this.views = {};
	this.error = [];
}

function login(username, password, callback) {
	console.log('I will be logged second');
	// Another async call nested inside. A common pattern:
	setTimeout(function () {
		console.log('I will be logged third');
		callback(null, {});
	}, 1000);
};

Sessions.prototype.setview = function (path, callback) {
	var curuser = this.username;
	var person = {};
	var _url = this.url;
	var curview = {};
	var _com = new Components(_url);
	setTimeout(function () {
		_com.getbypath(path, function (err, db) {
			if (err) {
				callback(err, null);
			} else {
				curview = db;
				callback(null, db);
			}

		});
	}, 500);

	this.views = curview;
};

Sessions.prototype.conecting = function (callback) {
	var curuser = this.username;
	var person = {};
	var _url = this.url;
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {

			console.log('Connect DB succes.' + curuser);
			HHDb = db.db('hh');
			var _session = HHDb.collection("session");


			_session.insert({ timelogin: new Date(), currentuser: {}, username: curuser }, {}, function (err, inserted) {
				if (err) {
					callback(err, null);
				} else {
					callback(null, inserted.ops[0]);
				}

			});
		}

	});
};

module.exports = Sessions;