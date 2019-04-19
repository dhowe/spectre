var User = {
  name: {
    type: 'string'
  },
  traits: {
    openness: {type: 'number'},
    conscientiousness: {type: 'number'},
    agreeableness: {type: 'number'},
    extraversion: {type: 'number'},
    neuroticism: {type: 'number'}
    // relationship: 'number',
    // gender: 'number',
    // age: 'number',
  },
  login: {
    type: 'string',
    required: true
  },
  loginType: {
    type: 'string',
    enum: ['twitter', 'google', 'facebook', 'email'],
    required: true
  },
  gender: {
    type: 'string',
    enum: ['male', 'female', 'other']
  },
  createdAt: {
    type: 'date',
    default: Date.now
  }
};

if (typeof exports !== 'undefined') exports.User = User;
if (typeof window !== 'undefined') window.User = User;
