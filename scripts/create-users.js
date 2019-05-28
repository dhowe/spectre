/*
 * usage: mongo --eval "let dbname='SB_NAME'" create-users.js
 */

// check dbname arg
if (typeof dbname === 'undefined' || (dbname !== 'spectre' && dbname !== 'spectre-dev'))
  throw Error("Expected dbname to be= 'spectre' or 'spectre-dev'");

// find the database
db = db.getSiblingDB(dbname);

// delete any existing users
db.users.deleteMany({});

// create unique indexes
db.users.createIndex({ 'login': 1, 'loginType': 1 }, { unique: true });

// insert initial users
db.users.insertMany([
  {
    "_id": ObjectId("111111111111111111111111"),
    "name": "Remy",
    "login": "Remy@aol.com",
    "loginType": "email",
    "gender": "female",
    "traits": {
      "agreeableness": 0,
      "conscientiousness": 0,
      "extraversion": 0,
      "openness": 0,
      "neuroticism": 0
    }
},
  {
    "_id": ObjectId("222222222222222222222222"),
    "name": "Bailey",
    "login": "Bailey@aol.com",
    "loginType": "email",
    "gender": "female",
    "traits": {
      "agreeableness": 0.1111111111111111,
      "conscientiousness": 0.1111111111111111,
      "extraversion": 0.1111111111111111,
      "openness": 0.1111111111111111,
      "neuroticism": 0.1111111111111111
    }
},
  {
    "_id": ObjectId("333333333333333333333333"),
    "name": "Devin",
    "login": "Devin@aol.com",
    "loginType": "email",
    "gender": "male",
    "traits": {
      "agreeableness": 0.2222222222222222,
      "conscientiousness": 0.2222222222222222,
      "extraversion": 0.2222222222222222,
      "openness": 0.2222222222222222,
      "neuroticism": 0.2222222222222222
    }
},
  {
    "_id": ObjectId("444444444444444444444444"),
    "name": "Tyler",
    "login": "Tyler@aol.com",
    "loginType": "email",
    "gender": "female",
    "traits": {
      "agreeableness": 0.3333333333333333,
      "conscientiousness": 0.3333333333333333,
      "extraversion": 0.3333333333333333,
      "openness": 0.3333333333333333,
      "neuroticism": 0.3333333333333333
    }
},
  {
    "_id": ObjectId("555555555555555555555555"),
    "name": "Fran",
    "login": "Fran@aol.com",
    "loginType": "email",
    "gender": "female",
    "traits": {
      "agreeableness": 0.4444444444444444,
      "conscientiousness": 0.4444444444444444,
      "extraversion": 0.4444444444444444,
      "openness": 0.4444444444444444,
      "neuroticism": 0.4444444444444444
    }
},
  {
    "_id": ObjectId("666666666666666666666666"),
    "name": "Pat",
    "login": "Pat@aol.com",
    "loginType": "email",
    "gender": "male",
    "traits": {
      "agreeableness": 0.5555555555555556,
      "conscientiousness": 0.5555555555555556,
      "extraversion": 0.5555555555555556,
      "openness": 0.5555555555555556,
      "neuroticism": 0.5555555555555556
    }
},
  {
    "_id": ObjectId("777777777777777777777777"),
    "name": "Sam",
    "login": "Sam@aol.com",
    "loginType": "email",
    "gender": "male",
    "traits": {
      "agreeableness": 0.6666666666666666,
      "conscientiousness": 0.6666666666666666,
      "extraversion": 0.6666666666666666,
      "openness": 0.6666666666666666,
      "neuroticism": 0.6666666666666666
    }
},
  {
    "_id": ObjectId("888888888888888888888888"),
    "name": "Reed",
    "login": "Reed@aol.com",
    "loginType": "email",
    "gender": "female",
    "traits": {
      "agreeableness": 0.7777777777777778,
      "conscientiousness": 0.7777777777777778,
      "extraversion": 0.7777777777777778,
      "openness": 0.7777777777777778,
      "neuroticism": 0.7777777777777778
    }
},
  {
    "_id": ObjectId("999999999999999999999999"),
    "name": "Terry",
    "login": "Terry@aol.com",
    "loginType": "email",
    "gender": "female",
    "traits": {
      "agreeableness": 0.8888888888888888,
      "conscientiousness": 0.8888888888888888,
      "extraversion": 0.8888888888888888,
      "openness": 0.8888888888888888,
      "neuroticism": 0.8888888888888888
    }
}])

let cursor = db.users.find({}, { login: 1, loginType: 1, name: 1, id: 1 });
while (cursor.hasNext()) { printjson(cursor.next()); }
