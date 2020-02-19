import { expect } from 'chai';
import UserModel from '../user-model';
import { oceanSort, oceanDist } from '../metrics';

describe('OCEAN Metrics', function () {

  describe('Server.oceanSort()', function () {
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

  describe('Server.oceanSort(limit)', function () {
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

  describe('Server.oceanDist()', function () {
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
