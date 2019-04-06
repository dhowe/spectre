const assert = require('chai').assert;
const expect = require('chai').expect;

const { oceanDist, oceanSort } = require('../predictions');

const User = require('../user-model');

describe('User Schema', function () {

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

    it('Should return Big5 trait names', function () {
      expect(User.Create().traitNames().length).to.equal(5);
    });
  })
});

describe('OCEAN Predictions', function () {

  describe('Predictions.oceanSort()', function () {
    it('Should error if a user is not provided', function () {
      expect(() => oceanSort(undefined, [])).to.throw();
    });
    it('Should error if candidates are not provided', function () {
      expect(() => oceanSort(User.Create(), undefined)).to.throw();
      expect(() => oceanSort(User.Create(), [])).to.throw();
    });
    it('Should sort candidates by distance to target', function () {

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

      let sorted = oceanSort(userA, [userA, userB, userC]);
      expect(sorted.length).eq(2);
      expect(sorted[0]._id).eq(userB._id);
      expect(sorted[1]._id).eq(userC._id);

      sorted = oceanSort(userA, [userB, userC]);
      expect(sorted.length).eq(2);
      expect(sorted[0]._id).eq(userB._id);
      expect(sorted[1]._id).eq(userC._id);
    });
  })

  describe('Predictions.oceanDist()', function () {
    it('Should error if two users are not provided', function () {
      expect(() => oceanDist(undefined, new User())).to.throw();
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
  })
});
