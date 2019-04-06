const assert = require('chai').assert;
const expect = require('chai').expect;
const User = require('../user-model');

describe('Text Generation', function () {

  describe('User.Describe()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = User.Create();
      user.traits = {
        agreeableness: 0,
        conscientiousness: .2,
        extraversion: .4,
        openness: .6,
        neuroticism: .8
      };
      let result = user.generateDescription();
      expect(result).is.a('string');
      expect(result.length).is.gt(0);
    });

  });
});
