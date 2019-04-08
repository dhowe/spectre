let mongoose = require('mongoose');
let oceanText = require('./ocean-text');
let { oceanSort } = require('./predictions');

let UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  traits: {
    openness: Number,
    conscientiousness: Number,
    agreeableness: Number,
    extraversion: Number,
    neuroticism: Number,
  },
  predictions: Object,
  login: {
    type: String,
    required: true
  },
  loginType: {
    type: String,
    enum: ['twitter', 'google', 'facebook', 'email'],
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateDescription = function() {

  function possess(user) {
    switch(user.gender) {
      case 'male': return 'his';
      case 'female': return 'her';
      case 'other': return 'their';
    }
  }

  function pronoun(user) {
    switch(user.gender) {
      case 'male': return 'he';
      case 'female': return 'she';
      case 'other': return 'they';
    }
  }

  function tobe(user) {
    return (user.gender === 'other') ? 'are' : 'is';
  }

  if (typeof this.traits === 'undefined' ||
    typeof this.traits.openness === 'undefined') {
    throw Error('User with traits required');
  }

  let lines = [],
    traitNames = this.traitNames();

  //console.log(user);
  for (var i = 0; i < traitNames.length; i++) {
    let val = this.traits[traitNames[i]];
    let idx = Math.min(traitNames.length-1, Math.floor(val * traitNames.length));
    //console.log(traits[i], val,'->',idx);
    lines.push(oceanText[traitNames[i]].text[idx]);
  }


  // lines[0] = lines[0].replace('[He\/She\/They]', this.name);
  // if (lines[0].startsWith(this.name +' [is\/are]'))
  //   lines[0] = lines[0].replace('[is\/are]', this.name);
  //
  // lines[0] = lines[0].replace(/\[he\/she\/they\]/g, pronoun(this));
  // lines[0] = lines[0].replace(/\[his\/her\/their\]/g, possess(this));
  // lines[0] = lines[0].replace(/\[is\/are\]/g, tobe(this));
//  lines[0] = lines[0].replace(/\[is\/are\]/, 'is');

  return lines;
}

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
  User.find({})
    .limit(num + 1)
    .exec(function (err, instances) {
      sorted = oceanSort(user, instances); // Sorting here
      //sorted.forEach((u) => console.log(u.name));
      sorted.shift();
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
