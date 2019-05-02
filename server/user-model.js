import lodash from 'lodash';
import mongoose from 'mongoose';
import { oceanSort } from './metrics';
import ClientUser from '../shared/user';

const { schema, functions } = toMongoose(new ClientUser());
const UserSchema = mongoose.Schema(schema);

// share user functions between schema and model
Object.keys(functions).forEach(f => UserSchema.methods[f] = functions[f]);

////////////////////// UserSchema.methods ////////////////////

UserSchema.methods.findByOcean = function (res, limit, cb) {
  let user = this;
  UserModel.find({})
    .exec(function (err, instances) {
      let sorted = oceanSort(user, instances);
      cb(sorted.slice(0, limit));
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

///////////////////////// Helpers ///////////////////////////

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

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
