import chai from 'chai';
import ppq from '../shared/ppq';
import UserModel from '../user-model';
import { oceanSort, oceanDist } from '../metrics';

chai.use(require('chai-roughly'));
const expect = chai.expect;

describe('OCEAN Metrics', function () {

  describe('OCEAN Predictions', function() {

    it('should return abbreviation for trait', function() {
      expect(ppq.abbreviate('openness')).to.eq('ope');
      expect(ppq.abbreviate('relation')).to.eq('relation');
      expect(ppq.abbreviate('neuroticism')).to.eq('neu');
    });

    it('should return score for responses', function() {
      const responses = [
        { "item": "zara", "rating": .4 },
        { "item": "cocacola", "rating": .8 },
        { "item": "next", "rating": -.2 },
        { "item": "rayban", "rating": 0 },
        { "item": "sony", "rating": .3 },
        { "item": "gap", "rating": -.6 },
      ];

      const expectedPredictions = [
        { trait: 'ope', score: 57.996023558648545 },
        { trait: 'con', score: 39.9576609776087 },
        { trait: 'ext', score: 44.519539472391294 },
        { trait: 'agr', score: 50.76247695615942 },
        { trait: 'neu', score: 55.215961633731865 },
        { trait: 'age', score: 45.053707518695646 },
        { trait: 'relation', score: 33.756908561739124 },
        { trait: 'gender', score: 31.233397186521742 }
      ];

      const predictions = toCambridge(ppq.predict(responses));
      expect(predictions).to.roughly.deep.equal(expectedPredictions);
    });

    it('should ignore invalid items', function() {
      const responses = [
        { "item": "INVALID", "rating": .4 },
        { "item": "zara", "rating": .4 },
        { "item": "cocacola", "rating": .8 },
        { "item": "next", "rating": -.2 },
        { "item": "rayban", "rating": 0 },
        { "item": "sony", "rating": .3 },
        { "item": "gap", "rating": -.6 },
      ];

      const expectedPredictions = [
        { trait: 'ope', score: 57.996023558648545 },
        { trait: 'con', score: 39.9576609776087 },
        { trait: 'ext', score: 44.519539472391294 },
        { trait: 'agr', score: 50.76247695615942 },
        { trait: 'neu', score: 55.215961633731865 },
        { trait: 'age', score: 45.053707518695646 },
        { trait: 'relation', score: 33.756908561739124 },
        { trait: 'gender', score: 31.233397186521742 }
      ];

      const predictions = toCambridge(ppq.predict(responses));
      expect(predictions).to.roughly.deep.equal(expectedPredictions);
    });

    it('Should fail when responses are not a filled array', function() {
      expect(() => ppq.predict([])).to.throw();
      expect(() => ppq.predict(undefined)).to.throw();
      expect(() => ppq.predict("notAnArray")).to.throw();
    });

    it('should fail when any rating is not a valid score', function() {
      // any number in: [-.9, -.8, -.7, ... .7, .8, .9]
      const responses = [
        { "item": "zara", "rating": .11 },
        { "item": "cocacola", "rating": .2 },
        { "item": "next", "rating": 0 },
        { "item": "rayban", "rating": 0 },
        { "item": "sony", "rating": 0 },
        { "item": "gap", "rating": 0 },
      ];
      expect(() => ppq.predict(responses)).to.throw();
    });

    it('should fail when ratings are all zeroes', function() {
      const responses = [
        { "item": "zara", "rating": 0 },
        { "item": "cocacola", "rating": 0 },
        { "item": "next", "rating": 0 },
        { "item": "rayban", "rating": 0 },
        { "item": "sony", "rating": 0 },
        { "item": "gap", "rating": 0 },
      ];
      expect(() => ppq.predict(responses)).to.throw();
    });

    /* converts spectre predictions to cambridge format */
    function toCambridge(predictions) {
      return predictions.map(p => ({
        trait: ppq.abbreviate(p.trait),
        score: p.score * 100
      }));
    }

  });

  describe('OCEAN Sorting', function () {

    it('Should error if a user is not provided', function () {
      expect(() => oceanSort(undefined, [])).to.throw();
    });

    it('Should handle undef or empty candidate array', function () {
      expect(() => oceanSort(UserModel.CreateModel(), undefined)).to.throw();
      expect(oceanSort(UserModel.CreateModel(), [])).to.eql([]);
    });

    it('Should sort candidates by distance to target', function () {
      let userA = UserModel.CreateModel();
      let userB = UserModel.CreateModel();
      let userC = UserModel.CreateModel();
      let userD = UserModel.CreateModel();

      userA.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 0
      };
      userB.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 1
      };
      userC.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 1,
        neuroticism: 1
      };

      let sorted = oceanSort(userA, [userA, userB, userC, userD]);
      expect(sorted.length).eq(3);
      expect(sorted[0]._id).eq(userB._id);
      expect(sorted[1]._id).eq(userC._id);
      expect(sorted[2]._id).eq(userD._id);

      let sorted2 = oceanSort(userA, [userB, userC, userD]);
      expect(sorted2.length).eq(3);
      expect(sorted2).eql(sorted);
    });
  });

  describe('OCEAN Sorting with limit', function () {

    it('Should error if 3rd arg is not a number', function () {
      expect(() => oceanSort(UserModel.CreateModel(), [], "ok")).to.throw();
    });

    it('Should error if 3rd arg is less than zero a number', function () {
      expect(() => oceanSort(UserModel.CreateModel(), [], -1)).to.throw();
    });

    it('Should return <limit> candidates, sorted by distance', function () {

      let limit = 1;
      let userA = UserModel.CreateModel();
      let userB = UserModel.CreateModel();
      let userC = UserModel.CreateModel();

      userA.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 0
      };
      userB.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 1
      };
      userC.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 1,
        neuroticism: 1
      };

      let sorted = oceanSort(userA, [userA, userB, userC], limit);
      expect(sorted.length).eq(1);
      expect(sorted[0]._id).eq(userB._id);

      sorted = oceanSort(userA, [userB, userC], limit);
      expect(sorted.length).eq(1);
      expect(sorted[0]._id).eq(userB._id);
    });
  })

  describe('OCEAN distance', function () {

    it('Should error if two users are not provided', function () {
      expect(() => oceanDist(undefined, new UserModel())).to.throw();
    });

    it('Should return 0 if user traits are the same', function () {
      let user = UserModel.CreateModel();
      user._randomizeTraits();
      expect(oceanDist(user, user)).to.eq(0);
    });

    it('Should return a positive distance for random users', function () {
      let userA = UserModel.CreateModel()
      userA._randomizeTraits();
      let userB = UserModel.CreateModel()
      userB._randomizeTraits();
      expect(oceanDist(userA, userB)).gt(0);
    });

    it('Should return the correct distance for two users', function () {
      let userA = UserModel.CreateModel();
      let userB = UserModel.CreateModel();
      userA.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 0
      };
      userB.traits = {
        agreeableness: 0,
        conscientiousness: 0,
        extraversion: 0,
        openness: 0,
        neuroticism: 1
      };
      expect(oceanDist(userA, userB)).eq(1);
    });
  })
});
