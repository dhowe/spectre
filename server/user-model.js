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

  if (typeof this.traits === 'undefined' ||
    typeof this.traits.openness === 'undefined') {
    throw Error('User with traits required');
  }

  let sent = '',
    traitNames = this.traitNames();

  //console.log(user);
  for (var i = 0; i < traitNames.length; i++) {
    let val = this.traits[traitNames[i]];
    let idx = Math.min(traitNames.length-1, Math.floor(val * traitNames.length));
    //console.log(traits[i], val,'->',idx);
    sent += oceanText[traitNames[i]].text[idx] + ' ';
  }

  return sent.trim();
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
