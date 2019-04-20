const assert = require('chai').assert;
const expect = require('chai').expect;

const { oceanDist, oceanSort } = require('../predictions');
const { UserModel } = require('../user-model');

describe('Server User', function () {
  describe('UserModel.Create()', function () {

    it('Should correctly complete a test user', function () {
      let user = UserModel.Create();
      expect(user.name.length).gt(0);
      expect(user.login.length).gt(0);
      expect(user.loginType.length).gt(0);
      expect(Object.keys(user.traits).length).to.equal(5);
    });

    it('Should correctly complete a templated user', function () {
      let user = UserModel.Create({ name: "dave", login: "dave@abc.com", loginType: "twitter" });
      expect(user.name).eq("dave");
      expect(user.login).eq("dave@abc.com");
      expect(user.loginType).eq("twitter");
      expect(Object.keys(user.traits).length).to.equal(5);
    });

    it('Should return Big5 trait names', function () {
      expect(UserModel.Create().traitNames().length).to.equal(5);
    });
  })
});

describe('UserModel.generateDescription', function () {

  it('Should fail for a user without traits', function () {
    expect(() => new UserModel().generateDescription()).to.throw();
  });

  it('Should describe a user based on OCEAN traits', function () {
    let user = UserModel.Create();
    user.name = "Jane";
    user.gender = "female";

    let result = user.generateDescription();
    expect(result).is.a('string');
    expect(result.length).is.gt(0);
    expect(result.startsWith('Jane')).eq(true);
  });
});

describe('OCEAN Predictions', function () {

  describe('Predictions.oceanSort()', function () {
    it('Should error if a user is not provided', function () {
      expect(() => oceanSort(undefined, [])).to.throw();
    });
    it('Should error if candidates are not provided', function () {
      expect(() => oceanSort(UserModel.Create(), undefined)).to.throw();
      expect(() => oceanSort(UserModel.Create(), [])).to.throw();
    });
    it('Should sort candidates by distance to target', function () {

      let userA = UserModel.Create();
      let userB = UserModel.Create();
      let userC = UserModel.Create();

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
      expect(() => oceanDist(undefined, new UserModel())).to.throw();
    });
    it('Should return 0 if user traits are the same', function () {
      let user = UserModel.Create();
      expect(oceanDist(user, user)).to.eq(0);
    });
    it('Should return a positive distance for random users', function () {
      let userA = UserModel.Create();
      let userB = UserModel.Create();
      expect(oceanDist(userA, userB)).gt(0);
    });
    it('Should return the correct distance for two users', function () {
      let userA = UserModel.Create();
      let userB = UserModel.Create();
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
