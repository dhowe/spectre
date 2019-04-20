const lodash = require('lodash');
const mongoose = require('mongoose');
const { oceanSort } = require('./predictions');
const ClientUser = require('../shared/models/user.js');
const { schema, functions } = toMongoose(new ClientUser());
const UserSchema = mongoose.Schema(schema);

// append object functions to our schema
Object.keys(functions).forEach(fn => UserSchema.methods[fn] = functions[fn]);

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
//   {
//   name: {
//     type: String
//   },
//   traits: {
//     openness: Number,
//     conscientiousness: Number,
//     agreeableness: Number,
//     extraversion: Number,
//     neuroticism: Number,
//   },
//   predictions: Object,
//   login: {
//     type: String,
//     required: true
//   },
//   loginType: {
//     type: String,
//     enum: ['twitter', 'google', 'facebook', 'email'],
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other']
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// UserSchema.methods.generateDescription = function () {
//
//   if (typeof this.traits === 'undefined' ||
//     typeof this.traits.openness === 'undefined') {
//     throw Error('User with traits required');
//   }
//
//   let lines = [],
//     traitNames = this.traitNames();
//
//   //console.log(user);
//   for (var i = 0; i < traitNames.length; i++) {
//     let val = this.traits[traitNames[i]];
//     let idx = Math.min(traitNames.length - 1, Math.floor(val * traitNames.length));
//     //console.log(traits[i], val,'->',idx);
//     lines.push(oceanText[traitNames[i]].text[idx]);
//   }
//
//   let parser = new Parser(this);
//   for (var i = 0; i < lines.length; i++) {
//     lines[i] = parser.parse(lines[i]);
//   }
//
//   return lines.join(' ').trim();
// }
//
// UserSchema.methods.poss = function () {
//   switch (this.gender) {
//   case 'male':
//     return 'his';
//   case 'female':
//     return 'her';
//   case 'other':
//     return 'their';
//   }
// }
//
// UserSchema.methods.pronoun = function () {
//   switch (this.gender) {
//   case 'male':
//     return 'he';
//   case 'female':
//     return 'she';
//   case 'other':
//     return 'they';
//   }
// }
//
// UserSchema.methods.toBe = function () {
//   return (this.gender === 'other') ? 'are' : 'is';
// }

UserSchema.methods.randomizeTraits = function () {
  this.traitNames().forEach((t) => this.traits[t] = Math.random());
  //this.traits.age = Math.round(20 + Math.random() * 50);
  return this;
}

UserSchema.methods.traitNames = function () {
  return Object.keys(this.traits);
}

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

let UserModel = mongoose.model('user', UserSchema);

UserModel.getAll = function (callback, limit) {
  UserModel.find(callback).limit(limit);
}

module.exports.UserModel = UserModel;
