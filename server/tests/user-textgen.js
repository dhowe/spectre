const assert = require('chai').assert;
const expect = require('chai').expect;
const User = require('../user-model');
const Parser = require('../parser');

describe('Text Generation', function () {

  describe('User.Describe()', function () {

    it('Should fail for a user without traits', function () {
      expect(() => new User().generateDescription()).to.throw();
    });

    it('Should describe a user based on OCEAN traits', function () {
      let user = User.Create();
      user.name = "Jane";
      user.gender = "female";
      //console.log(user);

      let result = user.generateDescription();

      //console.log('\n' + result);
      //expect(result).is.a('string');
      //expect(result.length).is.gt(0);
      // let parts = result.split(/%/);
      // for (var i = 0; i < 1; i++) {
      //   console.log(i + ') '+ result[i]+'\n');
      // }

    });

    describe('Parse Expressions', function () {
      it('Should parse symbols/choices from an expression', function () {

        let user = new User();
        user.name = "jen";
        let parser = new Parser(user);
        expect(parser.parse("Was $user.name.ucf() (ok | ok)?")).eq('Was Jen ok?');
      });
    });

    describe('Parse Symbols', function () {
      it('Should parse symbols from an expression', function () {

        let user = new User();
        user.name = "jen";
        let parser = new Parser(user);
        expect(parser.parseSymbols("$user.name was ok")).eq('jen was ok');
        expect(parser.parseSymbols("That was $user.name")).eq('That was jen');
        expect(parser.parseSymbols("That was $user.name.")).eq('That was jen.');
        expect(parser.parseSymbols("That was $user.name!")).eq('That was jen!');
        expect(parser.parseSymbols("Was that $user.name.ucf()?")).eq('Was that Jen?');

        expect(parser.parseSymbols("$user.name")).eq('jen');
        expect(parser.parseSymbols("$user.name")).eq('jen');
        expect(parser.parseSymbols("$user.name.toUpperCase()", 0)).eq('JEN');
        expect(parser.parseSymbols("$user.name.uc()", 0)).eq('JEN');
        expect(parser.parseSymbols("$user.name.ucf()", 0)).eq('Jen');

      });
    });

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
        expect(parser.parseChoices("x (a | a) (b | b) x")).eq('x a b x');
        expect(parser.parseChoices('(a|b)')).matches(/a|b/);
        expect(parser.parseChoices('(a|)')).matches(/a?/);
        expect(parser.parseChoices('(a|a)')).eq('a');
        expect(parser.parseChoices('(|)')).eq('');
      });
    });

  });
});
