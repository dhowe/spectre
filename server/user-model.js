const lodash = require('lodash');
const mongoose = require('mongoose');
const { oceanSort } = require('./predictions');
const ClientUser = require('../shared/models/user.js');
const { schema, functions } = toMongoose(new ClientUser());
const UserSchema = mongoose.Schema(schema);

// share user functions between schema and model
Object.keys(functions).forEach(f => UserSchema.methods[f] = functions[f]);

function toMongoose(obj) {

  let funcs = {};
  let result = {};

  // for ES6 classes
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(n => n !== 'constructor').forEach(fn => funcs[fn] = obj[fn]);

  Object.keys(obj).forEach(key => {

    // for object literals
    if (typeof obj[key] === 'function') {
      //console.log("F:",f);
      functions[key] = obj[key];
      return;
    }

    let type, property = lodash.cloneDeep(obj[key]);
    switch (property.type) {

    case 'id':
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
    // if we haven't gotten a type, recurse
    result[key] = type ? lodash.assign({}, property, { type }) :
      result[key] = toMongoose(property).schema;
  });

  return { schema: result, functions: funcs };
};

////////////////////// UserSchema.methods ////////////////////

UserSchema.methods.findByOcean = function (res, num, cb) {
  let user = this;
  UserModel.find({})
    .limit(num + 1)
    .exec(function (err, instances) {
      sorted = oceanSort(user, instances);
      sorted.shift(); // remove 'this' user
      cb(sorted);
    });
  return this;
};

////////////////////// UserSchema.statics ////////////////////

UserSchema.statics.getAll = function (callback, limit) {
  UserModel.find(callback).limit(limit);
}

UserSchema.statics.Create = function (tmpl) {

  function randName() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
  }

  let user = new UserModel();
  user.name = tmpl && tmpl.name ? tmpl.name : randName();
  user.login = tmpl && tmpl.login ? tmpl.login : user.name + '@' + randName() + '.com';
  user.loginType = tmpl && tmpl.loginType ? tmpl.loginType : 'facebook';

  return user.randomizeTraits();
}

/////////////////////////////////////////////////////////////

let UserModel = module.exports.UserModel = mongoose.model('user', UserSchema);
