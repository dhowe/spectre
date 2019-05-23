import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function () {

  describe('Create User()', function () {

    it('Should correctly construct an empty user', function () {
      let user = new User();
      expect(user.name).eq(undefined);
      expect(user.login).eq(undefined);
      expect(user.loginType).eq(undefined);
      expect(user.traits).eq(undefined);
      expect(user.createdAt).eq(undefined);
      expect(user.loginType).eq(undefined);
      expect(user.gender).eq(undefined);
      expect(user.hasOceanTraits()).eq(false);

    });

    it('Should create a user from a template', function () {

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
      expect(user.hasOceanTraits()).eq(true);
    });
  });


  describe('User.generateDescription()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
      //expect(() => User.Create().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = new User();//User.Create();
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
      expect(user.hasOceanTraits()).eq(true);
    });
  });

  describe('User.influencedBy()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().predictInfluences()).to.throw();
      //expect(() => User.Create().influencedBy()).to.throw();
    });

    it('Should return influenced-by statements based on OCEAN traits', function () {
      let user = new User();//User.Create();
      user.name = "Jane";
      user.gender = "female";
      user.traits = {
        agreeableness: 0.3,
        conscientiousness: Math.random(),
        extraversion: Math.random(),
        openness: Math.random(),
        neuroticism: Math.random()
      }
      let result = user.predictInfluences();
      //console.log(result);
      expect(result).is.a('array');
      expect(result.length).is.eq(3);

      // WORKING HERE

      //expect(result.startsWith('Jane')).eq(true);
    });
  });
});
