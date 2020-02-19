import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function() {

  describe('Create User()', function() {

    it('Should correctly construct an empty user', function() {
      let user = new User();
      let fields = Object.keys(User.schema());
      // these are fields defined with a default
      let withDefaults = ['clientId', 'lastPage', 'targetAd', 'dataChoices', 'loginType', 'updatedAt'];
      fields.forEach(f => {
        if (!withDefaults.includes(f)) {
          expect(user).has.property(f);
          expect(user[f], 'user.' + f + ' was ' + user[f]).is.undefined;
        }
      });
      //expect(user.clientId).eq(-1);
      expect(user.virtue).eq(undefined);
      expect(User.hasOceanTraits(user)).eq(false);
    });

    it('Should create a user from a template', function() {

      let user = new User({
        name: "dave",
        hasImage: true,
        login: "dave@abc.com",
        loginType: "twitter",
        virtue: 'truth',
        gender: 'male',
        lastPage: '/Test',
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
      expect(user.lastPage).eq("/Test");
      expect(user.traits.openness).to.equal(1);
      expect(User.hasOceanTraits(user)).eq(true);
      expect(User.categorize(user)).eq(1);
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

        user.setSimilars([{ id: '1111', name: 'Dave', traits: User.randomTraits() },
          { id: '2222', name: 'Jen', traits: User.randomTraits() }]);

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
        user.setTarget({ id: '2222', name: 'Jen', traits: User.randomTraits() });
        expect(user.name).eq("dave");
        expect(user.login).eq("dave@abc.com");
        expect(user.getTarget().name).eq('Jen');
        expect(user.getTarget()._id).eq('2222');
        expect(user.getTarget().traits.openness).is.gte(0);
        expect(user.getTarget().traits.openness).is.lt(1);
      });
    });
  */

  describe('User.personalization()', function() {

    let issues = ['leave', 'remain'];

    it('Should pick correct themes for target category', function() {
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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].themes).to.have.members
        (["expansive, open themes", "‘freedom’, ‘future’ or ‘potential’"]);

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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].themes).to.have.members
        (["struggle or strife", "‘borders’, ‘jobs’ or ‘mistakes’"]);

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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].themes.length).to.eq(2); // random

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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].themes).to.have.members
        (["scenes of relaxation", "‘hassle’ or ‘worry’"]);
    });

    it('Should pick correct images for target category', function() {
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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].images).to.have.members([
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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].images).to.have.members([
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

      User.computeInfluencesFor(user.target, issues);

      // random 'remains'
      expect(user.target.influences[user.adIssue].images.length).to.eq(4);
      user.target.influences[user.adIssue].images.forEach(img => {
        expect(img.startsWith('imgs/remain')).to.eq(true);
      });

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

      User.computeInfluencesFor(user.target, issues);

      expect(user.target.influences[user.adIssue].images).to.have.members([
        'imgs/remain_5.1.png',
        'imgs/remain_5.2.png',
        'imgs/remain_-5.1.png',
        'imgs/remain_-5.2.png'
      ]);
    });

    it('Should pick correct slogans for target category', function() {
      let user, slo;

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
      User.computeInfluencesFor(user.target, issues);
      slo = user.target.influences[user.adIssue].slogans;
      expect(slo).to.include.members(User.ifluencingSlogans.leave.high.openness);
      expect(slo).to.include.members(User.ifluencingSlogans.leave.low.openness);

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
      User.computeInfluencesFor(user.target, issues);
      slo = user.target.influences[user.adIssue].slogans;
      expect(slo).to.include.members(User.ifluencingSlogans.leave.high.agreeableness);
      expect(slo).to.include.members(User.ifluencingSlogans.leave.low.agreeableness);

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
      User.computeInfluencesFor(user.target, issues);
      // randoms 'remains'
      slo = user.target.influences[user.adIssue].slogans;
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
      User.computeInfluencesFor(user.target, issues);
      slo = user.target.influences[user.adIssue].slogans;
      expect(slo).to.include.members(User.ifluencingSlogans.remain.high.neuroticism);
      expect(slo).to.include.members(User.ifluencingSlogans.remain.low.neuroticism);
    });

    it('Should assign correct category for given traits', function() {

      expect(User.categorize(new User({
        traits: {
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          openness: 1,
          neuroticism: .3
        }
      }))).eq(1);

      expect(User.categorize(new User({
        traits: {
          openness: .5,
          agreeableness: .3,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .31
        }
      }))).eq(-4);

      expect(User.categorize(new User({
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: .51
        }
      }))).eq(0);

      expect(User.categorize(new User({
        traits: {
          openness: .5,
          agreeableness: .42,
          conscientiousness: .4,
          extraversion: .5,
          neuroticism: 0
        }
      }))).eq(-5);
    });
  });
});
