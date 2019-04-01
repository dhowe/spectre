const assert = require('chai').assert;
const expect = require('chai').expect;

const { oceanDist } = require('../predictions');
const { oceanSort } = require('../predictions');

const User = require('../user-model');

describe('User Schema', function () {

  describe('User.traitNames()', function () {
    it('Should return big5 trait names', function () {
      expect(User.Create().traitNames().length).to.equal(5);
    });
  });

  describe('User.Create()', function () {

    it('Should correctly complete a test user', function () {
      let user = User.Create();
      expect(user.name.length).gt(0);
      expect(user.login.length).gt(0);
      expect(user.loginType.length).gt(0);
      expect(Object.keys(user.traits).length).to.equal(5);
    });

    it('Should correctly complete a templated user', function () {
      let user = User.Create({ name: "dave", login: "dave@abc.com", loginType: "twitter" });
      expect(user.name).eq("dave");
      expect(user.login).eq("dave@abc.com");
      expect(user.loginType).eq("twitter");
      expect(Object.keys(user.traits).length).to.equal(5);
    });
  })
});

describe('Ocean Sort', function () {

  describe('Predictions.oceanSort()', function () {
    it('Should error if a user is not provided', function () {
      assert.throws(() => oceanSort(undefined, []));
    });
    it('Should error if candidates are not provided', function () {
      assert.throws(() => oceanSort(User.Create(), undefined));
      assert.throws(() => oceanSort(User.Create(), []));
    });
    it('Should sort candidates by distance', function () {
      let userA = User.Create();
      let userB = User.Create();
      let userC = User.Create();
      userA.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 0
      };
      userB.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 1
      };
      userC.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 1,
        neuroticism: 1
      };
      let sorted = oceanSort(userA, [userA, userB, userC])
      expect(sorted.length).eq(2);
      expect(sorted[0]._id).eq(userB._id);
      expect(sorted[1]._id).eq(userC._id);
    });
  })
});

describe('Ocean Distance', function () {
  describe('Predictions.oceanDist()', function () {
    it('Should error if two users are not provided', function () {
      assert.throws(() => oceanDist(undefined, new User()));
    });
    it('Should return 0 if user traits are the same', function () {
      let user = User.Create();
      expect(oceanDist(user, user)).to.eq(0);
    });
    it('Should return a positive distance for random users', function () {
      let userA = User.Create();
      let userB = User.Create();
      expect(oceanDist(userA, userB)).gt(0);
    });
    it('Should return the correct distance for two users', function () {
      let userA = User.Create();
      let userB = User.Create();
      userA.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 0
      };
      userB.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 1
      };
      expect(oceanDist(userA, userB)).eq(1);
    });
    // it('Should return dist (fixed)', function () {
    //   oceanDist(a, b);
    //   expect(res.sendCalledWith).to.equal(.5);
    // });
    // it('Should return dist (random)', function () {
    //   req.body.oceanA = Array.from({length: 5}, () => Math.random());
    //   req.body.oceanB = Array.from({length: 5}, () => Math.random());
    //   oceanDist(a, b);
    //   expect(res.sendCalledWith).to.be.at.least(0);
    // });
  })
});
