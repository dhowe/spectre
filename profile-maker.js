import sharp from 'sharp';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs-node';
import observer from 'chokidar';

class ProfileMaker {

  constructor(faceapiNet, modelDir) {

    this.border = 70;
    this.loaded = false;
    this.crop = undefined;
    this.image = undefined;
    this.watchPath = undefined;
    this.outputDir = './out';
    this.modelDir = modelDir || './model-weights';
    //this.detectionNet = faceapi.nets.tintFaceDetector
    this.detectionNet = faceapiNet || faceapi.nets.ssdMobilenetv1;
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
    //console.log('[IMAGE] ' + path);
    if (/^.*\/[a-f\d]{24}\.jpg$/i.test(path)) {
      try {
        const outf = path.replace(/\.jpg/, '.thumb.jpg');
        this.writeThumbnail(path, outf)
          .then(res => {
            if (res.status !== 'ok') console.error('ProfileMaker: ' + res.data);
            console.log("[THUMB] Wrote: " + outf);
          });
      }
      catch (e) {
        console.error('ProfileMaker: ' + e);
      }
    }
  }

  writeThumbnail = async (infile, outfile, width, height) => {
    console.log('ProfileMaker.writeThumbnail: ' + infile);
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
      console.log('[THUMB] Loaded face detection models...');
    }
    this.infile = infile;
    this.image = await canvas.loadImage(infile);
    await sharp(infile).metadata().then(md => {
      this.dimensions = { w: md.width, h: md.height };
    });;
    this.detection = await faceapi.detectSingleFace
      (this.image, detectorOpts(this.detectionNet))
    this.crop = this.detection.box;

    return this;
  }
}

export default new ProfileMaker();
