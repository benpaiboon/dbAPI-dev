const express = require('express');
const app = express();
var sleep = require('system-sleep');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Db = require('mongodb').Db;
var Sessions = require('./model/session.js');
var Users = require('./model/users.js');
var Activitys = require('./model/activity.js');
var Views = require('./model/view.js');
var Components = require('./model/component.js');
var Datasources = require('./model/datasource.js');
// selecting the `name` and `occupation` fields
var Res = require('./model/respons.js');
var Machines = require('./model/machine.js');

//var namecol = new  CollectionList();@

var _session = Sessions;


app.get('/', function (req, res) {

  var sender = new Res(res);

  sender.send('<!DOCTYPE html> <html>    <head>  <title>MongoDB API</title>    </head>  <body  > <h1>Welcome to MongoDB API..</h1> </body></html>')
});



app.post('/setview', function (req, res) {

  console.log(req.query);
  var sender = new Res(res);
  var _com = new Components(_session.url);
  setTimeout(function () {
    _com.getbypath(req.query.path, function (err, db) {
      if (err) {
        console.log(err);

        sender.send(JSON.stringify(err));

      } else {
        var sender = new Res(res)

        sender.send(db);
      }
    });

  }, 500);

});

app.post('/loaddatasource', function (req, res) {
  var sender = new Res(res);
  console.log(req.query);
  var sender = new Res(res)
  var _datasource = new Datasources(_session.url);
  var _datarow = new Datasources(_session.url);
  setTimeout(function () {
    _datasource.getbypath(req.query.path, function (err, db) {
      if (err) {


        sender.send(JSON.stringify(err));

      } else {
        // console.log(JSON.stringify(db));
        if (db) {

          var _sourcerow = [];
          db.forEach(function (_name) {
            _datarow.getbyname(_name, '', function (err, _row) {
              if (err) {
                sender.send(err);
              } else {
                //console.log( _name + ':' + JSON.stringify(_sourcerow));
                if (_row) {
                  _sourcerow.push(_row);
                  console.log(JSON.stringify(_row));


                };
              }
            });
          });
          setTimeout(function () {
            sender.send(JSON.stringify(_sourcerow));

          }, 2500);
        } else {

          sender.send('[]');
        }


      }
    });

  }, 500);

});

app.post('/databinding', function (req, res) {

  console.log(req.query);
  var sender = new Res(res);
  //var _datasource = new Datasources(_session.url); 
  if (_session.url) {
    var _datarow = new Datasources(_session.url);
    setTimeout(function () {

      var _sourcerow = {};
      _datarow.getbyname(req.query.name, req.query.filter, function (err, _row) {
        if (err) {
          sender.send(err);
        } else {
          //console.log( _name + ':' + JSON.stringify(_sourcerow));
          if (_row) {
            _sourcerow = _row;
            //console.log(JSON.stringify(_row));


          };
        }
      });
      setTimeout(function () {
        sender.send(JSON.stringify(_sourcerow));

      }, 2500);

    }, 500);


  } else {
    sender.send('Not Acess!!');
  }
});

app.get('/userautherize', function (req, res) {
  console.log(req.query);
  //var session = {_id:'1234',username:'superAdmin',password:'admin123',port:'27017',listsource:[] , error:''};
  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };
  //var MongoClient = require('mongodb').MongoClient;

  // Connection url
  // var url = 'mongodb://'+ session.username + ':' + session.password + '@localhost:' + session.port +'/';
  // Connect using MongoClient
  var sender = new Res(res);
  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {
      sender.send(JSON.stringify(db));


    }
  });
});

app.post('/login', function (req, res) {
  console.log(req.query);
  var sender = new Res(res);
  var sender = new Res(res);
  //var session = {_id:'1234',username:'superAdmin',password:'admin123',port:'27017',listsource:[] , error:''};
  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };
  //var MongoClient = require('mongodb').MongoClient;

  // Connection url
  // var url = 'mongodb://'+ session.username + ':' + session.password + '@localhost:' + session.port +'/';
  // Connect using MongoClient


  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {


      if (db) {
        var alluser = new Users(_session.url);
        alluser.getall(function (err, allrow) {
          if (err) {

          } else {
            sender.send(JSON.stringify(allrow));
          }
        });

      } else {

      }



    }
  });
});

app.get('/userlist', function (req, res) {
  console.log(req.query);
  var sender = new Res(res);

  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };

  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {


      if (db) {
        var alluser = new Users(_session.url);
        alluser.getall(function (err, allrow) {
          if (err) {
            console.log(err);
          } else {
            sender.send(JSON.stringify(allrow));
          }
        });
      } else {

      }



    }
  });
});



app.post('/savetime', function (req, res) {
  console.log(req.query);
  var sender = new Res(res);

  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };



  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {


      if (db) {
        var allactivity = new Activitys(_session.url);
        allactivity.savetime(req.query.job_id, req.query.act_array, function (err, allrow) {
          if (err) {
            console.log(err);
          } else {
            sender.send(JSON.stringify(allrow));
          }
        });



      } else {

      }



    }
  });
});


app.post('/addQrcode', function (req, res) {
  console.log(req.query);
  var sender = new Res(res);
  _session = new Sessions('', '');
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {
      if (db) {
        var allactivity = new Activitys(_session.url);
        var newactivity = new Activitys(_session.url);
        allactivity.getQrcode(req.query.currentuser, req.query.qrcodetext, function (err, qrcodenew) {
          if (err) {
            console.log(err);
          } else {
            if (qrcodenew) {
              newactivity.getbyid(qrcodenew, function (err2, newrow) {
                if (err) {

                } else {
                  console.log(JSON.stringify(newrow));
                  sender.send(JSON.stringify(newrow));
                }
              })
            }
          }
        });
      } else {

      }
    }
  });
});


app.get('/Qrcode', function (req, res) {
  console.log(req.query);
  var sender = new Res(res);

  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };

  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));

    } else {
      if (db) {
        var allactivity = new Activitys(_session.url);
        allactivity.getQrcode(req.query.currentuser, req.query.qrcodetext, function (err, qrcodenew) {
          if (err) {
            console.log(err);
          } else {
            console.log(JSON.stringify(qrcodenew));
            sender.send(JSON.stringify(qrcodenew));
          }
        });
      } else {

      }
    }
  });
});


app.get('/getActivity', function (req, res) {
  console.log(req.query);
  //var session = {_id:'1234',username:'superAdmin',password:'admin123',port:'27017',listsource:[] , error:''};
  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };

  var sender = new Res(res);

  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {


      if (db) {
        var allactivity = new Activitys(_session.url);
        allactivity.getall(function (err, allrow) {
          if (err) {
            console.log(err);
          } else {
            sender.send(JSON.stringify(allrow))
          }
        });
      } else {

      }
    }
  });
});

app.get('/MachineAll', function (req, res) {
  console.log(req.query);
  //var session = {_id:'1234',username:'superAdmin',password:'admin123',port:'27017',listsource:[] , error:''};
  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };

  var sender = new Res(res);

  _session = new Sessions('', '');
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {


      if (db) {
        var AllMachine = new Machines(_session.url);
        AllMachine.getall(function (err, allrow) {
          if (err) {
            console.log(err);
          } else {
            sender.send(JSON.stringify(allrow))
          }
        });
      } else {

      }
    }
  });
});



app.get('/resetpassword', function (req, res) {
  console.log(req.query);
  //var session = {_id:'1234',username:'superAdmin',password:'admin123',port:'27017',listsource:[] , error:''};
  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };
  //var MongoClient = require('mongodb').MongoClient;

  // Connection url
  // var url = 'mongodb://'+ session.username + ':' + session.password + '@localhost:' + session.port +'/';
  // Connect using MongoClient

  var sender = new Res(res);
  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));


    } else {


      if (db) {
        var alluser = new Users(_session.url);
        alluser.resetpassword(function (err, allrow) {
          if (err) {
            console.log(err);
          } else {
            sender.send(JSON.stringify(allrow));
          }
        });



      } else {

      }



    }
  });
});


// Ben function

// Calculate Machine Time
app.post('/machinetime', (req, res) => {
  // Example path to use this POST Method
  // http://localhost:27044/machinetime?id=5ab2201fcb713aea2c0d0b66

  var session = { _id: '1234', username: req.query.username, password: req.query.password, port: req.query.port, listsource: [], error: '' };

  var sender = new Res(res);

  _session = new Sessions(session.username, session.password);
  _session.conecting(function (err, db) {
    if (err) {
      sender.send(JSON.stringify(err));
    } else {
      if (db) {
        var allactivity = new Activitys(_session.url);
        allactivity.machinetime(req.query.id, function (err2, allrow) {
          if (err2) {
            console.log(err2);
          } else {
            // res.send(JSON.stringify(allrow));
            sender.send(JSON.stringify(allrow))
            // sender.send(allrow);
          }
        });
      } else {

      }
    }
  });
});


app.listen(27044, function () {
  console.log('dbAPI app listening on port 27044!')
});
