
import aSync from 'async';
import lodash from 'lodash';
import mongoose from 'mongoose';
import { oceanSort } from './metrics';
import ClientUser from './shared/user';

const clientUser = new ClientUser(ClientUser.schema());
const { schema, functions } = toMongoose(clientUser); // hack

// create the user schema with unique index
const UserSchema = mongoose.Schema(schema);
UserSchema.index({ 'login': 1, 'loginType': 1 }, { unique: true });
UserSchema.index({ 'updateTime': 1 }); // for sorting

// share user functions between schema and model
Object.keys(functions).forEach(f => UserSchema.methods[f] = functions[f]);

// additional functions on the UserSchema
UserSchema.statics.getAll = function(callback, limit) {
  UserModel.find(callback).limit(limit);
}

// create a randomised or templated user
UserSchema.statics.CreateModel = function(tmpl) {

  let randName = () => Math.random().toString(36)
    .replace(/[^a-z]+/g, '').substring(0, 5);

  let user = new UserModel();
  user.name = tmpl && tmpl.name ? tmpl.name : randName();
  user.login = tmpl && tmpl.login ? tmpl.login : user.name + '@' + randName() + '.com';
  user.loginType = tmpl && tmpl.loginType ? tmpl.loginType : 'email';

  return user;
}

// find users within a date range
UserSchema.statics.findByDate = function(date1, date2, callback) { // cb=function(err,users)
  UserModel.find({
    'traits.openness': { $gte: 0 },
    hasImage: true,
    created_at: {             // untested
      $gte: ISODate(date1),
      $lt: ISODate(date2)
    }
  }, callback);
}

// find mix of recents and similars via OCEAN
UserSchema.statics.findTargets = function(user, limit, callback) { // cb=function(err,users)
  aSync.parallel([
    (cb) => UserModel.findByRecent(user._id, Math.floor(limit / 2), cb),
    (cb) => UserModel.findByOcean(user, limit, cb)],
    (e, res) => {
      // union of our two result arrays (no-dups) with max size of limit
      let recentIds = res[0].map(t => t._id.toString());
      let similars = res[1].filter(s => !recentIds.includes(s._id.toString()));
      callback(e, res[0].concat(similars).slice(0, limit));
    });
};

// find most recently updated users with traits and image
UserSchema.statics.findByRecent = function(userId, limit, callback) { // cb=function(err,users)
  UserModel.aggregate([
    {
      $match: {
        'traits.openness': { $gte: 0 },
        _id: { $ne: new mongoose.Types.ObjectId(userId) },
        hasImage: true
      }
    },
    { $sort: { updatedAt: -1 } },
    { $limit: limit },
    { $project: { similars: 0 } }
  ], callback);
};

UserSchema.statics.findByLogin = function(login, callback) { // cb=function(err,users)
  // find all users with traits and image
  UserModel.findOne({ login: login, loginType: 'email' }, callback);
};

// find most similar users according to ocean traits
// TODO: this could be VERY slow on a big database ***
UserSchema.statics.findByOcean = function(user, limit, callback) { // cb=function(err,users)
  limit = limit || Number.MAX_SAFE_INTEGER;
  // find all users with traits and image
  UserModel.find({ 'traits.openness': { $gte: 0 }, "_id": { $ne: user._id }, 'hasImage': true },
    (e, similars) => {
      if (e) throw e;
      // then sort by ocean, then limit
      let sorted = oceanSort(user, similars);
      if (limit) sorted = sorted.slice(0, limit);
      callback(e, sorted); // ADDED: DCH
    });
};

// find most recent user on each with traits and image (not-used)
UserSchema.statics.findByLastPerMono = function(userId, callback) { // cb=function(err,users)
  UserModel.aggregate([
    {
      $match: {
        'traits.openness': { $gte: 0 },
        _id: { $ne: new mongoose.Types.ObjectId(userId) },
        hasImage: true
      }
    },
    { $sort: { clientId: -1, updatedAt: 1 } },
    {
      $group: {
        _id: "$clientId", // group by client-id
        id: { $last: "$_id" },
        name: { $last: "$name" },
        login: { $last: "$login" },
        updatedAt: { $last: "$updatedAt" },
        lastPage: { $last: "$lastPage" },
        hasImage: { $last: "$hasImage" },
      }
    },
    { $project: { _id: "$id", clientId: "$_id", updatedAt: 1, name: 1, lastPage: 1, login: 1 } }
  ], callback);
};

///////////////////////// Helpers ///////////////////////////

function toMongoose(obj) {

  function toMongooseType(t) {
    let type;
    switch (t) {
      case 'array':
        type = Array;
        break;
      case 'objectId':
        type = Schema.ObjectId;
        break;
      case 'number':
        type = Number;
        break;
      case 'string':
        type = String;
        break;
      case 'date':
        type = Date;
        break;
      case 'boolean':
        type = Boolean;
        break;
    }
    return type;
  }
  let funcs = {};
  let result = {};

  // for ES6 classes
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(n => n !== 'constructor').forEach(fn => funcs[fn] = obj[fn]);

  Object.keys(obj).forEach(key => {

    // for object literals
    if (typeof obj[key] === 'function') {
      functions[key] = obj[key];
      return;
    }

    let property = lodash.cloneDeep(obj[key]), ptype = property.type;

    // arrays and primitives
    let type = (Array.isArray(ptype)) ?
      [toMongooseType(ptype[0])]
      : toMongooseType(ptype);

    // if we haven't gotten a type, recurse
    result[key] = type ? lodash.assign({}, property, { type }) :
      result[key] = toMongoose(property).schema;
  });

  return { schema: result, functions: funcs };
};


const UserModel = mongoose.model('user', UserSchema);
UserModel.databaseDisabled = false;

export default UserModel;
