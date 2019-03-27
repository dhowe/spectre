const expect = require('chai').expect;

const { hello } = require('../../routes/distance');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) {
        this.sendCalledWith = arg;
    }
};

describe('Distance Route', function() {
    describe('oceanDist() function', function() {
        it('Should error out if two args are not provided', function() {
            hello(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
        it('Should error out if both are not length 5', function() {
            hello(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
        it('Should provided the correct distance in 5d space', function() {
            let newReq = req;
            newReq.body.name = 'Jody';

            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hello, Jody');
        });
    })
});
