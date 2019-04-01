const assert = require('chai').assert;
const expect = require('chai').expect;
const User = require('../user-model');
const { oceanDist } = require('../predictions');

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

describe('Ocean Distance', function () {
  describe('Predictions.oceanDist()', function () {
    it('Should error if two users are not provided', function () {
      assert.throws(() => oceanDist(undefined, new User()));
    });
    it('Should return 0 if user traits are the same', function () {
      let user = User.Create();
      expect(oceanDist(user, user)).to.eq(0);
      //expect(oceanDist(new User(), new User())).to.equal(0);
    });
    it('Should return a positive distance for two users', function () {
      expect(oceanDist(User.Create(), User.Create())).gt(0);
      //expect(oceanDist(new User(), new User())).to.equal(0);
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
