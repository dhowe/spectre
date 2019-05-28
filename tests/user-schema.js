import { expect } from 'chai';
import { oceanDist, oceanSort } from '../metrics';
import UserModel from '../user-model';

describe('Server User', function () {

  describe('UserModel.Create()', function () {

    it('Should correctly complete a test user', function () {
      let user = UserModel.Create();
      expect(user.name.length).gt(0);
      expect(user.login.length).gt(0);
      expect(user.loginType.length).gt(0);
      expect(Object.keys(user.traits).length).to.be.gte(5);
    });

    it('Should correctly complete a templated user', function () {
      let user = UserModel.Create({
        name: "dave",
        login: "dave@abc.com",
        loginType: "twitter"
      });
      expect(user.name).eq("dave");
      expect(user.login).eq("dave@abc.com");
      expect(user.loginType).eq("twitter");
      expect(Object.keys(user.traits).length).to.be.gte(5);
    });

    it('Should return Big5 trait names', function () {
      expect(UserModel.Create().oceanTraits().length).to.equal(5);
    });
  })

  describe('UserModel.generateDescription()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new UserModel().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = UserModel.Create();
      user.name = "Jane";
      user.gender = "female";
      user._randomizeTraits();
      let result = user.generateDescription();
      expect(result).is.a('string');
      expect(result.length).is.gt(0);
      expect(result.startsWith('Jane')).eq(true);
    });
  });
});
