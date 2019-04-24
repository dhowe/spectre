import { expect } from 'chai';
import UserModel from '../user-model';
import { oceanSort, oceanDist } from '../metrics';

describe('OCEAN Metrics', function () {

  describe('Server.oceanSort()', function () {
    it('Should error if a user is not provided', function () {
      expect(() => oceanSort(undefined, [])).to.throw();
    });
    it('Should error if candidates are not provided', function () {
      expect(() => oceanSort(UserModel.Create(), undefined)).to.throw();
      expect(() => oceanSort(UserModel.Create(), [])).to.throw();
    });
    it('Should sort candidates by distance to target', function () {

      let userA = UserModel.Create();
      let userB = UserModel.Create();
      let userC = UserModel.Create();

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

      let sorted = oceanSort(userA, [userA, userB, userC]);
      expect(sorted.length).eq(2);
      expect(sorted[0]._id).eq(userB._id);
      expect(sorted[1]._id).eq(userC._id);

      sorted = oceanSort(userA, [userB, userC]);
      expect(sorted.length).eq(2);
      expect(sorted[0]._id).eq(userB._id);
      expect(sorted[1]._id).eq(userC._id);
    });
  })

  describe('Server.oceanDist()', function () {
    it('Should error if two users are not provided', function () {
      expect(() => oceanDist(undefined, new UserModel())).to.throw();
    });
    it('Should return 0 if user traits are the same', function () {
      let user = UserModel.Create();
      expect(oceanDist(user, user)).to.eq(0);
    });
    it('Should return a positive distance for random users', function () {
      let userA = UserModel.Create();
      let userB = UserModel.Create();
      expect(oceanDist(userA, userB)).gt(0);
    });
    it('Should return the correct distance for two users', function () {
      let userA = UserModel.Create();
      let userB = UserModel.Create();
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
