/*
 * usage: mongo --eval "let dbname='SB_NAME'" create-users.js
 */

// check dbname arg
if (typeof dbname === 'undefined' ||  (dbname !== 'spectre' && dbname !== 'spectre-dev' )) 
  throw Error("Expected dbname to be= 'spectre' or 'spectre-dev'");

// find the database
db = db.getSiblingDB(dbname);

// delete any existing users
db.users.deleteMany({});

// create unique indexes
db.users.createIndex({ 'login': 1, 'loginType': 1}, { unique: true });

// insert initial users
db.users.insert({
  name: "Daniel",
  login: "daniel@aol.com",
  loginType: "facebook",
  gender: undefined,
  traits: {
    agreeableness: 0.1038,
    conscientiousness: 0.324,
    extraversion: 0.1229,
    openness: 0.6246,
    neuroticism: 0.9465
  }
});

db.users.insert({
  name: "Angie",
  login: "angie@aol.com",
  loginType: "twitter",
  gender: undefined,
  traits: {
    agreeableness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    openness: 0.5,
    neuroticism: 0.5
  }
});

db.users.insert({
  name: "Flip",
  login: "fliptrip@cnn.com",
  loginType: "email",
  gender: undefined,
  traits: {
    agreeableness: 1,
    conscientiousness: 1,
    extraversion: 1,
    openness: 1,
    neuroticism: 1
  }
});

let cursor = db.users.find({},{login:1,loginType:1,name:1,id:1});
while (cursor.hasNext()) { printjson(cursor.next()); }
