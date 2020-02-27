import { expect } from 'chai';
import User from '../shared/user';

describe('Client User', function() {

  describe('Create User()', function() {

    it('Should correctly construct an empty user', function() {
      let user = new User();
      let fields = Object.keys(User.schema());

      // these are fields defined with a default
      let withDefaults = ['clientId', 'lastPage', 'targetAd', 'dataChoices',
        'loginType', 'updatedAt', 'createdAt', 'traits'];

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

    let issues = ['republican', 'democrat'];

    it('Should pick correct themes for target category', function() {
      let user;

      user = new User({
        adIssue: 'republican',
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
        (["freedom, open skies, scenic vistas", "freedom, future or potential"]);

      user = new User({
        adIssue: 'republican',
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
        (["competition, sports, winning", "borders, jobs or paying for others mistakes"]);

      user = new User({
        adIssue: 'democrat',
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
        adIssue: 'democrat',
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
        (["carefree activities, relaxation, fun", "hassle, stress, worry"]);
    });

    it('Should pick correct images for target category', function() {
      let user;

      user = new User({
        adIssue: 'republican',
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
        'imgs/republican_1.1.jpg',
        'imgs/republican_1.2.jpg',
        'imgs/republican_-1.1.jpg',
        'imgs/republican_-1.2.jpg'
      ]);

      user = new User({
        adIssue: 'republican',
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
        'imgs/republican_4.1.jpg',
        'imgs/republican_4.2.jpg',
        'imgs/republican_-4.1.jpg',
        'imgs/republican_-4.2.jpg'
      ]);

      user = new User({
        adIssue: 'democrat',
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
        expect(img.startsWith('imgs/democrat')).to.eq(true);
      });

      user = new User({
        adIssue: 'democrat',
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
        'imgs/democrat_5.1.jpg',
        'imgs/democrat_5.2.jpg',
        'imgs/democrat_-5.1.jpg',
        'imgs/democrat_-5.2.jpg'
      ]);
    });

    it('Should pick correct slogans for target category', function() {
      let user, slo;

      user = new User({
        adIssue: 'republican',
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
      expect(slo).to.include.members(User.ifluencingSlogans.republican.high.openness);
      expect(slo).to.include.members(User.ifluencingSlogans.republican.low.openness);

      user = new User({
        adIssue: 'republican',
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
      expect(slo).to.include.members(User.ifluencingSlogans.republican.high.agreeableness);
      expect(slo).to.include.members(User.ifluencingSlogans.republican.low.agreeableness);

      user = new User({
        adIssue: 'democrat',
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
        adIssue: 'democrat',
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
      expect(slo).to.include.members(User.ifluencingSlogans.democrat.high.neuroticism);
      expect(slo).to.include.members(User.ifluencingSlogans.democrat.low.neuroticism);
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
