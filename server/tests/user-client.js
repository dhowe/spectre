const assert = require('chai').assert;
const expect = require('chai').expect;

const { oceanDist, oceanSort } = require('../predictions');

let User = require('../../shared/models/user.js');

describe('Client User', function () {

  describe('User.Create()', function () {
    it('Should correctly complete a test user', function () {
      let user = User.Create();
      expect(user.name.length).eq(0);
      expect(user.login.length).eq(0);
      expect(user.loginType.length).eq(0);
      expect(typeof user.traits).eq('object');
      expect(user.createdAt).eq(undefined);
      //expect(Object.keys(user.traits).length).to.equal(5);
    });

    it('Should correctly complete a templated user', function () {

      let user = User.Create({
        name: "dave",
        login: "dave@abc.com",
        loginType: "twitter",
        traits: {
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          openness: 1,
          neuroticism: .3
        }
      });
      expect(user.name).eq("dave");
      expect(user.login).eq("dave@abc.com");
      expect(user.loginType).eq("twitter");
      expect(user.traits.openness).to.equal(1);
      expect(Object.keys(user.traits).length).to.equal(5);
    });

    it('Should return Big5 trait names', function () {
      let traits = Object.keys(User.Create().traits);
      expect(traits.length).to.equal(5);
    });
  })
});
