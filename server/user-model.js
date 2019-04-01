let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  traits: {
    "Agreeableness": Number,
    "Conscientiousness": Number,
    "Extraversion": Number,
    "Openness": Number,
    "Neuroticism": Number,
    "Female": Number,
    "Age": Number
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// let user = new UserSchema({
//   name: {
//     type: String,
//     required: true
//   },
//   traits: {
//     "Agreeableness": Number,
//     "Conscientiousness": Number,
//     "Extraversion": Number,
//     "Openness": Number,
//     "Neuroticism": Number "Female": Number,
//     "Age": Number
//   },
//   login: {
//     type: String,
//     required: true
//   },
//   loginType: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String,
//   }
// });

UserSchema.methods.findByOcean = function (res, num) {
  let user = this;
  User.find({})
    .limit(num)
    .exec(function (err, instances) {
      sorted = oceanSort(user, instances); // Sorting here
      console.log(sorted);
    })
  return 11;
};

User = module.exports = mongoose.model('user', UserSchema);

function oceanSort(user, others) {
  others.sort(function (a, b) {
    return oceanDist(a, b);
  });
  return others;
}

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
