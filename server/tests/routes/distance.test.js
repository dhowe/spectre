const expect = require('chai').expect;
const { distance } = require('../../routes/distance');

let req = { body: {} };

let res = {
  sendCalledWith: '',
  send: function (arg) {
    this.sendCalledWith = arg;
  }
};

describe('Distance Route', function () {
  describe('oceanDist() function', function () {
    it('Should error if two args are not provided', function () {
      distance(req, res);
      expect(res.sendCalledWith).to.contain('error');
    });
    it('Should error if both are not length 5 arrays', function () {
      distance(req, res);
      expect(res.sendCalledWith).to.contain('error');
    });
    it('Should return 0 if arrays are the same', function () {
      req.body.oceanA = [.5, .5, .5, .5, .5];
      req.body.oceanB = [.5, .5, .5, .5, .5];
      distance(req, res);
      expect(res.sendCalledWith).to.equal(0);
    });
    it('Should return dist (fixed)', function () {
      req.body.oceanA = [.5, .5, .5, .5, 0];
      req.body.oceanB = [.5, .5, .5, .5, .5];
      distance(req, res);
      expect(res.sendCalledWith).to.equal(.5);
    });
    it('Should return dist (random)', function () {
      req.body.oceanA = Array.from({length: 5}, () => Math.random());
      req.body.oceanB = Array.from({length: 5}, () => Math.random());
      distance(req, res);
      expect(res.sendCalledWith).to.be.at.least(0);
    });
  })
});
