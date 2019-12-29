import lodash from 'lodash';
import mongoose from 'mongoose';
import { oceanSort } from './metrics';
import ClientUser from './shared/user';

// share user functions between schema and model
const userSchema = new ClientUser(ClientUser.schema());
const { schema, functions } = toMongoose(userSchema);
const UserSchema = mongoose.Schema(schema); // hack here
Object.keys(functions).forEach(f => UserSchema.methods[f] = functions[f]);

// TODO: all callbacks should pass error first

UserSchema.methods.findByOcean = function(limit, cb) { // cb=function(err,users)

  let user = this;
  UserModel.find({ 'traits.openness': { $gte: 0 } })
    .exec((err, instances) => {
      if (err) {
        console.error(err);
        throw err;
      }
      let sorted = oceanSort(user, instances);
      sorted = sorted.slice(0, limit);
      cb(err, sorted);
    });
  return this;
};

UserSchema.statics.getAll = function(callback, limit) {
  UserModel.find(callback).limit(limit);
}

UserSchema.statics.Create = function(tmpl) {

  function randName() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
  }

  let user = new UserModel();
  user.name = tmpl && tmpl.name ? tmpl.name : randName();
  user.login = tmpl && tmpl.login ? tmpl.login : user.name + '@' + randName() + '.com';
  user.loginType = tmpl && tmpl.loginType ? tmpl.loginType : 'facebook';

  return user;//._randomizeTraits();
}

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

    let type, property = lodash.cloneDeep(obj[key]), ptype = property.type;

    // arrays and primitives
    type = (Array.isArray(ptype)) ?
      [toMongooseType(ptype[0])]
      : toMongooseType(ptype);

    // if we haven't gotten a type, recurse
    result[key] = type ? lodash.assign({}, property, { type }) :
      result[key] = toMongoose(property).schema;
  });

  return { schema: result, functions: funcs };
};

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
