import sharp from 'sharp';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs-node';
import observer from 'chokidar';
import clfDate from 'clf-date';

class ProfileMaker {

  constructor(modelDir) {

    this.border = 100;
    this.loaded = false;
    this.crop = undefined;
    this.image = undefined;
    this.watchPath = undefined;
    this.outputDir = './out';
    this.detectAgeGender = false;
    this.modelDir = modelDir || './model-weights';
    //this.detectionNet = faceapi.nets.tintFaceDetector
    this.detectionNet = faceapi.nets.ssdMobilenetv1;
    this.ageGenderNet = faceapi.nets.ageGenderNet;
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  }

  watch = (path) => {
    observer.watch(path, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: true
    }).on('add', this.onImage);
  }

  onImage = (path) => {
    console.log('[IMAGE] ' + path);
    if (/^.*\/[a-f\d]{24}_raw\.jpg$/i.test(path)) {
      try {
        const outf = path.replace(/_raw\.jpg/, '.jpg');
        this.writeThumbnail(path, outf)
          .then(res => {
            if (res.status !== 'ok') {
              console.error('ProfileMaker: ' + res.data);
              return;
            }
            console.log('[' + clfDate() + '] ::* THUMB', outf ?
              outf.replace(/.*\/public/, '/public') : '_unknown_');
          });
      }
      catch (e) {
        console.error('ProfileMaker::52: ' + path + '\n' + e);
      }
    }
  }

  writeThumbnail = async (infile, outfile, width, height) => {
    width = width || 128;
    height = height || 128;

    if (!this.crop) await this.detect(infile);
    let imgw = this.dimensions.w, imgh = this.dimensions.h;

    const bounds = (b, imgw, imgh) => {
      const left = Math.max(0, Math.round(b.x) - this.border);
      const top = Math.max(0, Math.round(b.y) - this.border);
      const width = Math.min(imgw - left, Math.round(b.width + this.border * 2));
      const height = Math.min(imgh - top, Math.round(b.height + this.border * 2));
      return { width: width, height: height, top: top, left: left };
    }

    try {
      const f = await sharp(this.infile)
        .extract(bounds(this.crop, imgw, imgh))
        .resize(width, height)
        .normalise()
        .toFile(outfile);
      return { status: 'ok', data: f };
    }
    catch (e) {
      return { status: 'err', data: e };
    }
  }

  drawCrop = async (infile, outfile, width, height) => {

    if (!this.crop) this.detect(infile);
    const out = faceapi.createCanvasFromMedia(this.image);
    faceapi.draw.drawDetections(out, this.detection);
    await sharp(out)
      .resize(width, height)
      .normalise()
      .toFile(outfile)
  }

  detect = async (infile) => {

    const detectorOpts = (net) => {
      return net === faceapi.nets.ssdMobilenetv1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
        : new faceapi.TinyFaceDetectorOptions
          ({ inputSize: 408, scoreThreshold: 0.5 });
    }
    if (!this.loaded) {
      this.loaded = true;  // ^ or 'tinyFaceDetector'
      await this.detectionNet.loadFromDisk(this.modelDir);
      if (this.detectAgeGender) {
        await this.ageGenderNet.loadFromDisk(this.modelDir);
      }
      console.log('[' + clfDate() + '] ::* THUMB Loaded face training models');
    }
    this.infile = infile;
    this.image = await canvas.loadImage(infile);
    await sharp(infile).metadata().then(md => {
      this.dimensions = { w: md.width, h: md.height };
    });;

    if (this.detectAgeGender) {
      this.result = await faceapi.detectSingleFace
        (this.image, detectorOpts(this.detectionNet)).withAgeAndGender();
      this.crop = this.result.detection.box;
      this.age = this.result.age;
      this.gender = this.result.gender;
      this.genderProb = this.result.genderProbability;
    }
    else {
      this.result = await faceapi.detectSingleFace
        (this.image, detectorOpts(this.detectionNet));
      this.crop = this.result.box;
    }

    return this;
  }
}

export default new ProfileMaker();
