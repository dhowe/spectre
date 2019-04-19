const mongoose = require('mongoose');
const oceanText = require('./ocean-text');
const { oceanSort } = require('./predictions');
const Parser = require('./parser');
const _ = require('lodash');

const json = require('../shared/models/user.js').User;
const mongooseSchema = toMongoose(json);
const UserSchema = mongoose.Schema(mongooseSchema);

function toMongoose(json) {

  let result = {};
  _.map(Object.keys(json), (key) => {
    let type, property = _.cloneDeep(json[key]);

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
    result[key] = type ? _.assign({}, property, { type }) :
      result[key] = toMongoose(property);
  });

  return result;
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

UserSchema.methods.generateDescription = function () {

  if (typeof this.traits === 'undefined' ||
    typeof this.traits.openness === 'undefined') {
    throw Error('User with traits required');
  }

  let lines = [],
    traitNames = this.traitNames();

  //console.log(user);
  for (var i = 0; i < traitNames.length; i++) {
    let val = this.traits[traitNames[i]];
    let idx = Math.min(traitNames.length - 1, Math.floor(val * traitNames.length));
    //console.log(traits[i], val,'->',idx);
    lines.push(oceanText[traitNames[i]].text[idx]);
  }

  let parser = new Parser(this);
  for (var i = 0; i < lines.length; i++) {
    lines[i] = parser.parse(lines[i]);
  }

  return lines.join(' ').trim();
}

UserSchema.methods.randomizeTraits = function () {
  this.traitNames().forEach((t) => this.traits[t] = Math.random());
  //this.traits.age = Math.round(20 + Math.random() * 50);
  return this;
}

UserSchema.methods.poss = function () {
  switch (this.gender) {
  case 'male':
    return 'his';
  case 'female':
    return 'her';
  case 'other':
    return 'their';
  }
}

UserSchema.methods.pronoun = function () {
  switch (this.gender) {
  case 'male':
    return 'he';
  case 'female':
    return 'she';
  case 'other':
    return 'they';
  }
}

UserSchema.methods.toBe = function () {
  return (this.gender === 'other') ? 'are' : 'is';
}

UserSchema.methods.traitNames = function () {
  return Object.keys(this.traits);
}

UserSchema.methods.findByOcean = function (res, num, cb) {
  let user = this;
  User.find({})
    .limit(num + 1)
    .exec(function (err, instances) {
      sorted = oceanSort(user, instances);
      sorted.shift(); // remove 'this' user
      cb(sorted);
    });
  return this;
};

function randName() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
}

UserSchema.statics.Create = function (tmpl) {
  let user = new User();
  user.name = tmpl && tmpl.name ? tmpl.name : randName();
  user.login = tmpl && tmpl.login ? tmpl.login : user.name + '@' + randName() + '.com';
  user.loginType = tmpl && tmpl.loginType ? tmpl.loginType : 'facebook';
  return user.randomizeTraits();
}

User = module.exports = mongoose.model('user', UserSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}
