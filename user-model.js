import lodash from 'lodash';
import mongoose from 'mongoose';
import { oceanSort } from './metrics';
import ClientUser from './shared/user';

const clientUser = new ClientUser(ClientUser.schema());
const { schema, functions } = toMongoose(clientUser); // hack

// create the user schema with unique index
const UserSchema = mongoose.Schema(schema);
UserSchema.index({ 'login': 1, 'loginType': 1 }, { unique: true });

// share user functions between schema and model
Object.keys(functions).forEach(f => UserSchema.methods[f] = functions[f]);

// additional functions on the UserSchema
UserSchema.statics.getAll = function(callback, limit) {
  UserModel.find(callback).limit(limit);
}

UserSchema.statics.Create = function(tmpl) {

  let randName = () => Math.random().toString(36)
    .replace(/[^a-z]+/g, '').substring(0, 5);

  let user = new UserModel();
  user.name = tmpl && tmpl.name ? tmpl.name : randName();
  user.login = tmpl && tmpl.login ? tmpl.login : user.name + '@' + randName() + '.com';
  user.loginType = tmpl && tmpl.loginType ? tmpl.loginType : 'facebook';

  return user;//._randomizeTraits();
}

// find all users with traits
UserSchema.methods.findByOcean = function(callback, limit) { // cb=function(err,users)
  let user = this;
  UserModel.find({ 'traits.openness': { $gte: 0 }, 'hasImage': true })
    .exec((err, candidates) => {
      if (err) {
        console.error('findByOcean', err);
        throw err;
      }
      let sorted = oceanSort(user, candidates);
      sorted = sorted.slice(0, limit);
      callback(err, sorted); // ADDED: DCH
    });
    // TODO: this could VERY slow on a big database
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
UserModel.databaseDisabled = false;

export default UserModel;
