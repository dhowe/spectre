import { expect } from 'chai';
import UserModel from '../user-model';

describe('User Schema', function() {

  describe('UserModel.findBy', () => {

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

  describe('UserModel.createModel', function() {

    it('Should correctly complete a test user', function() {
      let user = UserModel.createModel();
      expect(user.name.length).gt(0);
      expect(user.login.length).gt(0);
      expect(user.loginType.length).gt(0);
      expect(Object.keys(user.traits).length).to.be.gte(5);
    });

    it('Should correctly complete a templated user', function() {
      let user = UserModel.createModel({
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

  describe('UserModel.textgen', function() {

    it('Should fail for a user without traits', function() {
      expect(() => new UserModel().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function() {
      let user = UserModel.createModel();
      user.name = "Jane";
      user.adIssue = "democrat";
      user.gender = "female";
      user.age = 31.45;
      user._randomizeTraits();
      let result = user.generateDescription();
      expect(result).is.an('object');
      expect(result.opening).is.an('array');
    });
  });
});
