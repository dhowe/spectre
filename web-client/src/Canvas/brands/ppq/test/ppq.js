const expect = require('chai').expect;
const ppq = require('../src/ppq.js');

describe('PPQ', function() {

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

        const predictions = ppq.predict(responses);

        expect(predictions).to.eql(expectedPredictions);
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

        const predictions = ppq.predict(responses);
        expect(predictions).to.eql(expectedPredictions);
    });

    it('should error when responses are empty', function() {
        expect(()=>ppq.predict([])).to.throw();
    });

    it('should error when responses are not an array', function() {
        expect(()=>ppq.predict("notAnArray")).to.throw();
    });

    it('should throw when ratings are all zeroes', function() {
        const responses = [
            { "item": "zara", "rating": 0 },
            { "item": "cocacola", "rating": 0 },
            { "item": "next", "rating": 0 },
            { "item": "rayban", "rating": 0 },
            { "item": "sony", "rating": 0 },
            { "item": "gap", "rating": 0 },
        ];
        expect(()=>ppq.predict(responses)).to.throw();
    });

});
