import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function () {

  describe('Create User()', function () {

    it('Should correctly construct an empty user', function () {
      let user = new User();
      let fields = Object.keys(User.schema());

      // these are fields defined with a default
      let ignores = ['clientId', 'isActive', 'category'];
      fields.forEach(f => {
        if (ignores.indexOf(f) < 0) {
          expect(user[f]).eq(undefined);
          expect(user).has.property(f);
        }
      });
      expect(user.clientId).eq(-1);
      expect(user.category).eq(0);
      expect(user.isActive).eq(false);
      expect(user.hasOceanTraits()).eq(false);
    });

    it('Should create a user from a template', function () {

      let user = new User({
        name: "dave",
        hasImage: true,
        login: "dave@abc.com",
        loginType: "twitter",
        lastPageVisit: { time: +Date.now(), page: '/Test' },
        similars: [JSON.stringify({ id: '1111', name: 'Dave', traits: User._randomTraits() }),
        JSON.stringify({ id: '2222', name: 'Jen', traits: User._randomTraits() })],
        target: JSON.stringify({ id: '2222', name: 'Jen', traits: User._randomTraits() }),
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
      expect(user.lastPageVisit.page).eq("/Test");
      expect(user.traits.openness).to.equal(1);
      expect(user.hasOceanTraits()).eq(true);
      expect(user.categorize()).eq(1);
      expect(user.getSimilars()).is.a('array');
      expect(user.getSimilars().length).eq(2);
      expect(user.getSimilars()[0].name).eq('Dave');
      expect(user.getSimilars()[1].name).eq('Jen');
      expect(user.getSimilars()[0].id).eq('1111');
      expect(user.getSimilars()[1].id).eq('2222');
      expect(user.getTarget().name).eq('Jen');
      expect(user.getTarget().id).eq('2222');
      expect(user.getTarget().traits.openness).is.gte(0);
      expect(user.getTarget().traits.openness).is.lt(1);
    });
  });

  describe('User.similarTargets()', function () {
    it('Should correctly set similars as strings', function () {
      let user = new User({
        name: "dave",
        login: "dave@abc.com",
        loginType: "twitter"
      });

      user.setSimilars([{ id: '1111', name: 'Dave', traits: User._randomTraits() },
        { id: '2222', name: 'Jen', traits: User._randomTraits() }]);

      expect(user.name).eq("dave");
      expect(user.login).eq("dave@abc.com");
      expect(user.getSimilars()).is.a('array');
      expect(user.getSimilars().length).eq(2);
      expect(user.getSimilars()[0].name).eq('Dave');
      expect(user.getSimilars()[1].name).eq('Jen');
      expect(user.getSimilars()[0].id).eq('1111');
      expect(user.getSimilars()[1].id).eq('2222');
    });

    it('Should correctly set target as strings', function () {
      let user = new User({
        name: "dave",
        login: "dave@abc.com",
        loginType: "twitter"
      });
      user.setTarget({ id: '2222', name: 'Jen', traits: User._randomTraits() });
      expect(user.name).eq("dave");
      expect(user.login).eq("dave@abc.com");
      expect(user.getTarget().name).eq('Jen');
      expect(user.getTarget().id).eq('2222');
      expect(user.getTarget().traits.openness).is.gte(0);
      expect(user.getTarget().traits.openness).is.lt(1);
    });
  });

  describe('User.personalization()', function () {

    it('Should pick correct images for user category', function () {
      let user, imgs;

      user = new User({
        adIssue: 'leave',
        traits: {
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          openness: 1,
          neuroticism: .3
        }
      });
      imgs = user.targetAdImages();
      expect(imgs).to.have.members([
'imgs/leave_1.1.png',
'imgs/leave_1.2.png',
'imgs/leave_-1.1.png',
'imgs/leave_-1.2.png'
]);

      user = new User({
        adIssue: 'leave',
        traits: {
          openness: .5,
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .31
        }
      });
      imgs = user.targetAdImages();
      //console.log(imgs);
      expect(imgs).to.have.members([
        'imgs/leave_4.1.png',
        'imgs/leave_4.2.png',
        'imgs/leave_-4.1.png',
        'imgs/leave_-4.2.png'
      ]);

      user = new User({
        adIssue: 'remain',
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .51
        }
      });

      // random 'remains'
      imgs = user.targetAdImages();
      imgs.forEach(img => { expect(img.startsWith('imgs/remain')).to.eq(true) });
      expect(imgs.length).to.eq(4);

      user = new User({
        adIssue: 'remain',
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: 0
        }
      });
      imgs = user.targetAdImages();
      expect(imgs).to.have.members([
        'imgs/remain_5.1.png',
        'imgs/remain_5.2.png',
        'imgs/remain_-5.1.png',
        'imgs/remain_-5.2.png'
      ]);
    });

    it('Should pick correct slogan for user category', function () {
      let user;
      user = new User({
        adIssue: 'leave',
        traits: {
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          openness: 1,
          neuroticism: .3
        }
      });
      let slo = user.targetAdSlogans();
      expect(slo).to.include.members(User.adSlogans.leave.high.openness);
      expect(slo).to.include.members(User.adSlogans.leave.low.openness);

      user = new User({
        adIssue: 'leave',
        traits: {
          openness: .5,
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .31
        }
      });
      slo = user.targetAdSlogans();
      expect(slo).to.include.members(User.adSlogans.leave.high.agreeableness);
      expect(slo).to.include.members(User.adSlogans.leave.low.agreeableness);

      user = new User({
        adIssue: 'remain',
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .51
        }
      });
      // randoms 'remains'
      slo = user.targetAdSlogans();
      expect(slo.length).to.eq(4); // cat=1

      user = new User({
        adIssue: 'remain',
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: 0
        }
      });
      slo = user.targetAdSlogans();
      expect(slo).to.include.members(User.adSlogans.remain.high.neuroticism);
      expect(slo).to.include.members(User.adSlogans.remain.low.neuroticism);
    });

    it('Should assign correct category for given traits', function () {
      expect(new User({
        traits: {
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          openness: 1,
          neuroticism: .3
        }
      }).categorize()).eq(1);
      expect(new User({
        traits: {
          openness: .5,
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .31
        }
      }).categorize()).eq(-4);
      expect(new User({
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .51
        }
      }).categorize()).eq(0);
      expect(new User({
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: 0
        }
      }).categorize()).eq(-5);
    });
  });

  describe('User.generateLongDescription()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateLongDescription()).to.throw();
    });

    it('Should long-describe a user based on OCEAN traits', function () {
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
      let result = user.generateLongDescription();
      //console.log(result);
      expect(result).is.a('string');
      expect(result.length).is.gt(0);
      expect(result.startsWith('Jane')).eq(true);
      expect(user.hasOceanTraits()).eq(true);
    });
  });

  describe('User.generateDescription()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = new User(); //User.Create();
      user.name = "Jane";
      user.gender = "female";
      user.traits = User._randomTraits();
      let result = user.generateSentences(3);
      console.log(result);
      expect(result).is.a('string');
      expect(result.length).is.gt(0);
      expect(result.startsWith('Jane')).eq(true);
      expect(user.hasOceanTraits()).eq(true);
    });
  });
});
