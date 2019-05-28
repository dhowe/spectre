import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function () {

  describe('Create User()', function () {

    it('Should correctly construct an empty user', function () {
      let user = new User();
      let fields = Object.keys(User.schema());
      fields.forEach(f => {
        if (f === 'clientId' || f === 'hasImage') return;
        expect(user[f]).eq(undefined);
        expect(user).has.property(f);
      });
      expect(user.clientId).eq(-1);
      expect(user.hasImage).eq(false);
      expect(user.hasOceanTraits()).eq(false);
    });

    it('Should create a user from a template', function () {

      let user = new User({
        name: "dave",
        hasImage: true,
        login: "dave@abc.com",
        loginType: "twitter",
        similars: ["1111||Dave", "2222||Jen"],
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
      expect(user.hasImage).eq(true);
      expect(user.loginType).eq("twitter");
      expect(user.traits.openness).to.equal(1);
      expect(user.hasOceanTraits()).eq(true);
      expect(user.getSimilars()).is.a('array');
      expect(user.getSimilars().length).eq(2);
      expect(user.getSimilars()[0].name).eq('Dave');
      expect(user.getSimilars()[1].name).eq('Jen');
      expect(user.getSimilars()[0].id).eq('1111');
      expect(user.getSimilars()[1].id).eq('2222');
    });
  });

  describe('User.generateDescription()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
      //expect(() => User.Create().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = new User(); //User.Create();
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
      let user = new User(); //User.Create();
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
