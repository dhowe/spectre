const express = require('express');
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const OId = mongo.ObjectID;

const collName = 'users';
const dbName = 'heroku_n1rrs8xc';
const localDb = 'localhost:27017';
const mlabDb = 'spectre-client:9OcDekAshelfendyaj!@ds127646.mlab.com:27646';

let db, dbcoll;
let port = process.env.port || 3000;
let dbUrl =  process.env.MONGODB_URI || 'mongodb://' + mlabDb + '/' + dbName;//process.env.MONGODB_URI || localDb;dbUrl = process.env.MONGODB_URI || 'mongodb://' + mlabDb + '/' + dbName;
console.log('process.env.MONGODB_URI: ' + process.env.MONGODB_URI);
console.log('dbUrl: ' + dbUrl);

const app = express();
app.use(bodyParser.json());

mongo.MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db(dbName); // global for connection pooling
  dbcoll = db.collection(collName);
  //console.log("using database : "+ );//+" with ", dbcoll.countDocuments({}),' records');

  let server = app.listen(port, function () {
    console.log('Spectre server connected to ' + dbUrl);// + "::" + db.databaseName);
  });
});

app.get('/', (req, res) => res.send('Welcome to the SPECTRE server...'));

/*  "/api/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

app.get("/api/users", function (req, res) {
  dbcoll.find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/users", function (req, res) {

  let newUser = req.body;
  newUser.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user", "Must provide an name", 400);
  } else if (!req.body.loginType) {
    handleError(res, "Invalid user", "Must provide an loginType", 400);
  } else if (!req.body.login) {
    handleError(res, "Invalid user", "Must provide an login", 400);
  } else {
    dbcoll.insertOne(newUser, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
        console.log('OK: User created -> ', doc.ops[0]);
      }
    });
  }
});

/*  "/api/users/:id"
 *    GET: find user by id
 *    PUT: update user by id
 *    DELETE: deletes user by id
 */

app.get("/api/users/:id", function (req, res) {
  dbcoll.findOne({ _id: new OId(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/users/:id", function (req, res) {
  let updateUser = req.body;
  delete updateUser._id;

  dbcoll.updateOne({ _id: new OId(req.params.id) }, updateUser, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateUser._id = req.params.id;
      res.status(200).json(updateUser);
    }
  });
});

////////////////////////////////////////////////////////////////////////

app.delete("/api/users/:id", function (req, res) {
  dbcoll.deleteOne({ _id: new OId(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}
