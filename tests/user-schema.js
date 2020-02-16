import { expect } from 'chai';
import UserModel from '../user-model';

describe('Server User', function() {

  // describe('UserModel.findByUpdateTime()', function () {
  //   const id = "666666666666666666666666";
  //   let users = UserModel.mostRecent(limit)
  // });

  describe('UserModel.FindBy', () => {

    it('Should correctly find similars via ocean', (done) => {

      const id = "666666666666666666666666";
      UserModel.findById(id, (e, user) => {
        if (e) throw e;
        expect(user._id.toString()).eq(id);
        UserModel.findByOcean(user, 6, (err, users) => {
          if (err) throw err;
          //console.log(users.map(u => u._id + '/' + u.name));
          expect(users.length).eq(6, users.map(u => u._id + '/' + u.name));
          expect(id).not.to.be.oneOf(users.map(u => u._id.toString()));
          done();
        });
      })
    });

    it('Should correctly find most recent users', (done) => {

      const id = "666666666666666666666666";
      UserModel.findById(id, (e, user) => {
        if (e) throw e;
        expect(user._id.toString()).eq(id);
        UserModel.findByRecent(user._id, 6, (err, users) => {
          if (err) throw err;
          //console.log(users.map(u => u._id + '/' + u.name));
          expect(users.length).eq(6, users.map(u => u._id + '/' + u.name));
          expect(id).not.to.be.oneOf(users.map(u => u._id.toString()));
          done();
        });
      })
    });

  });

  describe('UserModel.Create', function() {

    it('Should correctly complete a test user', function() {
      let user = UserModel.Create();
      expect(user.name.length).gt(0);
      expect(user.login.length).gt(0);
      expect(user.loginType.length).gt(0);
      expect(Object.keys(user.traits).length).to.be.gte(5);
    });

    it('Should correctly complete a templated user', function() {
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
  })

  describe('UserModel.Generate', function() {

    it('Should fail for a user without traits', function() {
      expect(() => new UserModel().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function() {
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
