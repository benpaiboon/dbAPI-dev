var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;
//var passportLocalMongoose = require('passport-local-mongoose');

//var db = mongoose.connection;
var hhDb = MongoClient.db;

function Activitys(_url) {
	this.url = _url;
}

Activitys.prototype.getall = function (callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {
			hhDb = db.db('hh');
			hhDb.collection("activitys").find({}).limit(100).sort({ "createon": -1 }).toArray(function (err, result) {
				if (err) {
					console.log(err);
					callback(err, null);
				} else {
					if (result) {
						callback(null, result);
					} else {
						callback('Not found!!', null);
					};


				}
			});



		}
	});


};

Activitys.prototype.savetime = function (job_id, act_array, callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {
			hhDb = db.db('hh');
			hhDbUpdate = db.db('hh');
			hhDb.collection("activitys").find({ jobid: job_id }).toArray(function (err, result) {
				if (err) {
					console.log(err);
					callback(err, null);
				} else {
					if (result) {
						result.forEach(function (element) {
							var newArr = JSON.parse(act_array);
							element.activity = [];
							newArr.forEach(function (newitem) {
								element.activity.push(
									{
										"act_event": newitem.act_event,
										"act_time": newitem.act_time,
										"act_status": newitem.act_status,
										"date": newitem.date
									}
								)
							})

							hhDbUpdate.collection("activitys").updateOne({ _id: element._id }, { $set: { activity: element.activity } }, function (err2, res) {
								if (err) throw err;
								console.log("1 document updated");

								callback(null, element);
							})
						}, this);

					} else {
						callback('Not found!!', null);
					};


				}
			});



		}
	});


};


Activitys.prototype.getQrcode = function (CurrentUser, QrcodeText, callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {
			hhDb = db.db('hh');
			hhDbUpdate = db.db('hh');
			var QrcodeData = QrcodeText.split('||')
			var act_id = new ObjectID();
			var actObj = {
				"_id": act_id,
				"jobid": QrcodeText,
				"machineid": '-',
				"job": QrcodeData[1],
				"suffix": QrcodeData[2],
				"operation": QrcodeData[3],
				"item": QrcodeData[4],
				"workCenter": QrcodeData[1],
				"userid": CurrentUser,
				"username": CurrentUser.name,
				"zone": "",
				"act_event": "SCAN",
				"current_date": Date.now(),
				"activity": [],
				"createdon": Date.now(),
				"lastmodifiedon": Date.now(),
				"goodresult": QrcodeData[5],
				"badresult": "0",
				"worker": "1"
			}

			hhDb.collection("activitys").insertOne(actObj, function (err, result) {
				if (err) {
					console.log(err);
					callback(err, null);
				} else {
					if (result) {
						console.log('1 Qrcode scan');
						callback(null, act_id);
					};
				}
			});



		}
	});


};
Activitys.prototype.getbyname = function (username, callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {
			hhDb = db.db('hh');
			hhDb.collection("activitys").find({ "username": username }).toArray(function (err, result) {
				if (err) {
					console.log(err);
					callback(err, null);
				} else {
					if (result) {
						callback(null, result);
					} else {
						callback('Not found!!', null);
					};


				}
			});



		}
	});


};

Activitys.prototype.getbyid = function (qrcodeid, callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {

			console.log('Connect DB succes.' + qrcodeid);
			//	var act_id = new ObjectID();
			hhDb = db.db('hh');
			hhDb.collection("activitys").find({ _id: new ObjectID(qrcodeid) }).toArray(function (err2, result) {
				if (err) {
					console.log(err2);
					callback(err2, null);
				} else {
					if (result) {
						callback(null, result[0]);
					} else {
						callback('Not found!!', null);
					};


				}
			});



		}
	});


};

Activitys.prototype.addbyname = function (name, callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {

			console.log('Connect DB succes.' + curuser);
			hhDb = db.db('hh');
			hhDb.collection("Activitys").find({ "username": curuser }, function (err, result) {
				if (err) {
					console.log(err);
					callback(err, null);
				} else {
					if (result) {
						callback(null, result);
					} else {
						callback('Not found!!', null);
					};


				}
			});



		}
	});


};

// Calculate Machine Time
Activitys.prototype.machinetime = function (docId, callback) {
	MongoClient.connect(this.url, function (err, db) {
		if (err) {
			console.log('Not Connect DB!.' + err);
			callback(err, null);
		} else {
			hhDb = db.db('hh');
			hhDb.collection("activitys").findOne({ _id: new ObjectID(docId) }, function (err2, result) {
				if (err2) {
					console.log(err2);
					callback(err2, null);
				}
				else {
					var startTime = [];
					var lastStartTime = Date;
					var pauseTime = [];
					var finishTime = Date;
					var finalActionTime = Date;
					var diffTimeArr = [];
					var machineTime = Date;

					result.activity.forEach(element => {
						if (element.act_event === 'START') {
							startTime.push(element.act_time);
						}
						if (element.act_event === 'PAUSE') {
							pauseTime.push(element.act_time);
						}
						if (element.act_event === 'FINISH') {
							finishTime = element.act_time;
						}
					});

					if ((pauseTime === undefined || pauseTime.length == 0)) {
						console.log('***No Pause Event***');
						machineTime = finishTime - startTime.pop();
						console.log('Final Machine Time: ', machineTime);
						console.log('==================================');

						// Update Mongo by using machineTime
						// Do stuff here...
						hhDbUpdate = db.db('hh');
						hhDbUpdate.collection("activitys").updateOne({ _id: new ObjectID(docId) }, { $set: { total_time: machineTime } }, function (err3, res) {
							if (err3) throw err3;
							console.log("Machine total time has been updated at _id:", new ObjectID(docId));							
						});
					} else {
						var diffTimeMap = pauseTime.map(function (item, index) {
							return item - startTime[index];
						});

						console.log('***Has A Pause Event***');
						diffTimeArr = diffTimeMap;
						lastStartTime = startTime.splice(-1).pop();
						finalActionTime = Math.abs(finishTime - lastStartTime);
						diffTimeArr.push(finalActionTime);

						var machineTime = 0;
						for (var i = 0; i < diffTimeArr.length; i++) {
							machineTime += diffTimeArr[i]
						}
						console.log('Final Machine Time: ', machineTime);
						console.log('==================================');

						// Update Mongo by using machineTime
						// Do stuff here...
						hhDbUpdate = db.db('hh');
						hhDbUpdate.collection("activitys").updateOne({ _id: new ObjectID(docId) }, { $set: { total_time: machineTime } }, function (err3, res) {
							if (err3) throw err3;
							console.log("Machine total time has been updated at _id:", new ObjectID(docId));
						});
					}
					callback(null, result);
				}
			});

		}
	});
};

module.exports = Activitys;