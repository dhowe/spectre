import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function () {

  describe('Create User()', function () {

    it('Should correctly construct an empty user', function () {
      let user = new User();
      let fields = Object.keys(User.schema());

      // these are fields defined with a default
      let ignores = ['clientId', 'celebrity', 'targetAd', 'dataChoices', 'loginType'];
      fields.forEach(f => {
        if (!ignores.includes(f)) {
          expect(user).has.property(f);
          expect(user[f]).is.undefined;
        }
      });
      expect(user.clientId).eq(-1);
      expect(user.category).eq(0);
      //expect(user.isActive).eq(false);
      expect(user.virtue).eq(undefined);
      expect(user.hasOceanTraits()).eq(false);
    });

    it('Should create a user from a template', function () {

      let user = new User({
        name: "dave",
        hasImage: true,
        login: "dave@abc.com",
        loginType: "twitter",
        virtue: 'truth',
        gender: 'male',
        lastPageVisit: { time: +Date.now(), page: '/Test' },
        traits: {
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          openness: 1,
          neuroticism: .3
        }
      });

      expect(user.name).eq("dave");
      expect(user.virtue).eq("truth");
      expect(user.gender).eq("male");
      expect(user.login).eq("dave@abc.com");
      expect(user.hasImage).eq(true);
      expect(user.loginType).eq("twitter");
      expect(user.lastPageVisit.page).eq("/Test");
      expect(user.traits.openness).to.equal(1);
      expect(user.hasOceanTraits()).eq(true);
      expect(user.categorize()).eq(1);
    });
  });

/* Commented for now
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
      expect(user.getSimilars()[0]._id).eq('1111');
      expect(user.getSimilars()[1]._id).eq('2222');
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
      expect(user.getTarget()._id).eq('2222');
      expect(user.getTarget().traits.openness).is.gte(0);
      expect(user.getTarget().traits.openness).is.lt(1);
    });
  });
*/

  describe('User.personalization()', function () {

    it('Should pick correct influences for target', function () {
      let user, infls;

      user = new User({
        adIssue: 'leave',
        target: {
          name: 'TARGET',
          traits: {
            agreeableness: .3,
            conscientiousness: .4,
            extraversion: .5,
            openness: 1,
            neuroticism: .3
          }
        }
      });
      infls = user.targetAdInfluences();
      expect(infls).to.have.members(["expansive, open themes", "‘freedom’, ‘future’ or ‘potential’"]);

      user = new User({
        adIssue: 'leave',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .3,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: .31
          }
        }
      });
      infls = user.targetAdInfluences();
      expect(infls).to.have.members(["struggle or strife", "‘borders’, ‘jobs’ or ‘mistakes’"]);

      user = new User({
        adIssue: 'remain',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .42,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: .51
          }
        }
      });
      infls = user.targetAdInfluences();
      expect(infls.length).to.eq(2); // random

      user = new User({
        adIssue: 'remain',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .42,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: 0
          }
        }
      });
      infls = user.targetAdInfluences();
      expect(infls).to.have.members(["scenes of relaxation", "‘hassle’ or ‘worry’"]);
    });

    it('Should pick correct images for target category', function () {
      let user, imgs;

      user = new User({
        adIssue: 'leave',
        target: {
          name: 'TARGET',
          traits: {
            agreeableness: .3,
            conscientiousness: .4,
            extraversion: .5,
            openness: 1,
            neuroticism: .3
          }
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
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .3,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: .31
          }
        }
      });

      imgs = user.targetAdImages();
      expect(imgs).to.have.members([
        'imgs/leave_4.1.png',
        'imgs/leave_4.2.png',
        'imgs/leave_-4.1.png',
        'imgs/leave_-4.2.png'
      ]);

      user = new User({
        adIssue: 'remain',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .42,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: .51
          }
        }
      });

      // random 'remains'
      imgs = user.targetAdImages();
      imgs.forEach(img => { expect(img.startsWith('imgs/remain')).to.eq(true) });
      expect(imgs.length).to.eq(4);

      user = new User({
        adIssue: 'remain',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .42,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: 0
          }
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

    it('Should pick correct slogan for target category', function () {
      let user;

      user = new User({
        adIssue: 'leave',
        target: {
          name: 'TARGET',
          traits: {
            agreeableness: .3,
            conscientiousness: .4,
            extraversion: .5,
            openness: 1,
            neuroticism: .3
          }
        }
      });
      let slo = user.targetAdSlogans();
      expect(slo).to.include.members(User.adSlogans.leave.high.openness);
      expect(slo).to.include.members(User.adSlogans.leave.low.openness);

      user = new User({
        adIssue: 'leave',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .3,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: .31
          }
        }
      });
      slo = user.targetAdSlogans();
      expect(slo).to.include.members(User.adSlogans.leave.high.agreeableness);
      expect(slo).to.include.members(User.adSlogans.leave.low.agreeableness);

      user = new User({
        adIssue: 'remain',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .42,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: .51
          }
        }
      });
      // randoms 'remains'
      slo = user.targetAdSlogans();
      expect(slo.length).to.eq(4); // cat=1

      user = new User({
        adIssue: 'remain',
        target: {
          name: 'TARGET',
          traits: {
            openness: .5,
            agreeableness: .42,
            conscientiousness: .4,
            extraversion: .5,
            neuroticism: 0
          }
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
});
