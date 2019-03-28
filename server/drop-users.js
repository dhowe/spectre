let client = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/spectre";

client.connect(url, { useNewUrlParser: true }, function(err, client) {
  if (err) throw err;
  let dbo = client.db("spectre");
  dbo.collection("users").drop(function(err, ok) {
    if (err) { 
      if (err == 'MongoError: ns not found') {
        console.log("Users collection empty");
      }
      else throw err;
    }
    if (ok) console.log("Users collection deleted");
    client.close();
  });
}); 
