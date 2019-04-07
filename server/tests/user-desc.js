const assert = require('chai').assert;
const expect = require('chai').expect;
const User = require('../user-model');
const Parser = require('../parser');

describe('Text Generation', function () {

  describe('Parse Choices', function () {
    it('Should parse groups from an expression', function () {
      let parser = new Parser();
      expect(parser.parseChoices("x (a | a | a) x")).eq('x a x');
      expect(parser.parseChoices("x (a | a | a)")).eq('x a');
      expect(parser.parseChoices("x (a | a | a)x")).eq('x ax');
      expect(parser.parseChoices("x(a | a | a) x")).eq('xa x');
      expect(parser.parseChoices("x(a | a | a)x")).eq('xax');
      expect(parser.parseChoices("x (a | a | a) (b | b | b) x")).eq('x a b x');
      expect(parser.parseChoices("x (a | a | a)(b | b | b) x")).eq('x ab x');
    });
  });

  describe('User.Describe()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = User.Create();
      user.name = "Jane";
      user.gender = "female";

      let result = user.generateDescription();

      //console.log(result);
      // expect(result).is.a('string');
      // expect(result.length).is.gt(0);
      // let parts = result.split(/%/);
      // for (var i = 0; i < 1; i++) {
      //   console.log(i + ') '+ result[i]+'\n');
      // }

    });

  });
});
