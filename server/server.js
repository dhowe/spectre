const express = require('express');
const bodyParser = require("body-parser");
const mongo = require("mongodb");

const localDb = "mongodb://localhost:27017/spectre";
const OId = mongo.ObjectID;
const collection = 'users';

let db, port = 3000;

const app = express();
app.use(bodyParser.json());

let dbUrl = process.env.MONGODB_URI || localDb;

mongo.MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db('spectre'); // global for connection pooling
  //console.log("using database : "+ );//+" with ", db.collection(collection).countDocuments({}),' records');

  let server = app.listen(process.env.port || port, function () {
    console.log('Spectre server connected to ' + dbUrl + "@" + db.databaseName + ':' + server.address().port);
  });
});

app.get('/', (req, res) => res.send('Welcome to the SPECTRE server...'));

/*  "/api/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

app.get("/api/users", function (req, res) {
  db.collection(collection).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts");
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
    db.collection(collection).insertOne(newUser, function (err, doc) {
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
  db.collection(collection).findOne({ _id: new OId(req.params.id) }, function (err, doc) {
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

  db.collection(collection).updateOne({ _id: new OId(req.params.id) }, updateUser, function (err, doc) {
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
  db.collection(collection).deleteOne({ _id: new OId(req.params.id) }, function (err, result) {
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
