import chai from 'chai';
import chaifs from 'chai-fs';
import { zipAll } from '../imageio';

const expect = chai.expect;
chai.use(chaifs);

describe('Image IO', function () {

  describe('ImageIO.zipAll function', function () {
    it('Should error if no directory is given', function () {
      expect(() => zipAll(undefined, '')).to.throw();
    });
    it('Should zip files in directory', function () {
      let path = '/tmp/targets.zip';
      zipAll('client/public/targets', path).then(() => {
        expect(path).to.be.a.path();
      });
    });
  })
});
