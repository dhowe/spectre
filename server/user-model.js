let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ocean: {
    type: [Number],
    default: undefined
  },
  login: {
    type: String,
    required: true
  },
  loginType: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    default: undefined
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.findByOcean = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

User = module.exports = mongoose.model('user', userSchema);

User.findByOcean = function (user, num) {
  return 11;
  // WORKING HERE
};

function oceanDist(a, b) {
  let total = 0,
    diff;
  for (let i = 0; i < a.length; i++) {
    diff = b[i] - a[i];
    total += diff * diff;
  }
  return Math.sqrt(total);
}

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}
