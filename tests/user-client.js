import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function () {

  describe('User.Create()', function () {

    it('Should correctly construct an empty user', function () {
      let user = User.Create();
      expect(user.name.length).eq(0);
      expect(user.login.length).eq(0);
      expect(user.loginType.length).eq(0);
      expect(typeof user.traits).eq('object');
      expect(typeof user.traits.openness).eq('number');
      expect(Object.keys(user.traits).length).is.gte(5);
      expect(user.createdAt).eq(undefined);
    });

    it('Should construct a user from a template', function () {

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
    });
  });

  describe('New User()', function () {

    it('Should correctly construct an empty user', function () {
      let user = new User({});
      expect(user.name).eq(undefined);
      expect(user.login).eq(undefined);
      expect(user.loginType).eq(undefined);
      expect(user.traits).eq(undefined);
      expect(user.createdAt).eq(undefined);
      expect(user.loginType).eq(undefined);
      expect(user.gender).eq(undefined);
    });

    it('Should construct a user from a template', function () {

      let user = new User({
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
    });
  });


  describe('User.generateDescription()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
      expect(() => User.Create().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = User.Create();
      user.name = "Jane";
      user.gender = "female";
      user.traits = {
        agreeableness: 0.3,
        conscientiousness: Math.random(),
        extraversion: Math.random(),
        openness: Math.random(),
        neuroticism: Math.random()
      }
      let result = user.generateDescription();
      //console.log(result);
      expect(result).is.a('string');
      expect(result.length).is.gt(0);
      expect(result.startsWith('Jane')).eq(true);
    });
  });

  describe('User.influencedBy()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().influencedBy()).to.throw();
      expect(() => User.Create().influencedBy()).to.throw();
    });

    it('Should return influenced-by statements based on OCEAN traits', function () {
      let user = User.Create();
      user.name = "Jane";
      user.gender = "female";
      user.traits = {
        agreeableness: 0.3,
        conscientiousness: Math.random(),
        extraversion: Math.random(),
        openness: Math.random(),
        neuroticism: Math.random()
      }
      let result = user.influencedBy();
      //console.log(result);
      expect(result).is.a('array');
      expect(result.length).is.eq(3);

      // WORKING HERE

      //expect(result.startsWith('Jane')).eq(true);
    });
  });
});
