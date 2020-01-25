import sharp from 'sharp';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs-node';
import observer from 'chokidar';
import clfDate from 'clf-date';

const BRIGHTEN = 1.5;

class ProfileMaker {

  constructor(modelDir) {

    this.border = 200;
    this.loaded = false;
    this.detectAgeGender = false;
    this.modelDir = modelDir || './model-weights';
    this.detectionNet = faceapi.nets.ssdMobilenetv1;
    this.ageGenderNet = faceapi.nets.ageGenderNet;
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    this.loadModels();
  }

  watch = (path) => {
    console.log('[' + clfDate() + '] ::* WATCH ' + pathify(path));
    observer.watch(path, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: true
    })
      .on('add', this.onImage)
      .on('change', this.onImage);
  }

  onImage = (path) => {

    console.log('[' + clfDate() + '] ::* IMAGE ' + pathify(path));

    if (/^.*\/[a-f\d]{24}_raw\.jpg$/i.test(path)) {
      try {
        const outf = path.replace(/_raw\.jpg/, '.jpg');
        this.makeThumbnail(path, outf)
          .then(res => {
            if (res.status !== 'ok') {
              console.error('[ERROR] ProfileMaker.1:: ' + res.data);
              return;
            }
            console.log('[' + clfDate() + '] ::* THUMB', pathify(outf));
          });
      }
      catch (e) {
        console.error('[ERROR] ProfileMaker.2:: ' + path + '\n' + e);
      }
    }
  }

  makeThumbnail = async (infile, outfile, width, height) => {

    const bounds = (b, iw, ih) => {
      const left = Math.max(0, Math.round(b.x) - this.border);
      const top = Math.max(0, Math.round(b.y) - this.border);
      const w = Math.min(iw - left, Math.round(b.width + this.border * 2));
      const h = Math.min(ih - top, Math.round(b.height + this.border * 2));
      return { width: w, height: h, top: top, left: left };
    }

    try {
      const result = await this.detect(infile);
      const dims = result.dimensions;
      const f = await sharp(infile)
        .extract(bounds(result.box, dims.w, dims.h))
        .modulate({ brightness: BRIGHTEN }) // increase lightness factor
        .resize(width || 128, height || 128)
        .normalise()
        .toFile(outfile);
      return { status: 'ok', data: f };
    }
    catch (e) {
      return { status: 'err', data: e };
    }
  }

  drawCrop = async (infile, outfile, width, height) => {

    let result = await this.detect(infile);
    const out = faceapi.createCanvasFromMedia(result.image);
    faceapi.draw.drawDetections(out, result); // untested
    await sharp(out)
      .resize(width, height)
      .normalise()
      .toFile(outfile)
  }

  loadModels = async () => {
    this.loaded = true;  // ^ or 'tinyFaceDetector'
    console.log('[' + clfDate() + '] ::* THUMB Preload face training models');

    await this.detectionNet.loadFromDisk(this.modelDir);
    if (this.detectAgeGender) {
      await this.ageGenderNet.loadFromDisk(this.modelDir);
    }
    console.log('[' + clfDate() + '] ::* THUMB Loaded face training models');
  }

  detect = async (infile) => {

    console.log('[' + clfDate() + '] ::* DETECT ' + pathify(infile));
    const detectorOpts = (net) => {
      return net === faceapi.nets.ssdMobilenetv1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
        : new faceapi.TinyFaceDetectorOptions
          ({ inputSize: 408, scoreThreshold: 0.5 });
    }
    if (!this.loaded) this.loadModels();
    let dims, image = await canvas.loadImage(infile);
    await sharp(infile).metadata().then(md => {
      dims = { w: md.width, h: md.height };
    });

    let result;
    if (this.detectAgeGender) {
      let detection = await faceapi.detectSingleFace(image,
        detectorOpts(this.detectionNet)).withAgeAndGender();
      result = {
        age: detection.age,
        gender: detection.gender,
        genderProb: detection.genderProbability,
        box: detection.detection.box,
        dimensions: dims,
        image: image
      }
    }
    else {
      let detection;
      try {
        detection = await faceapi.detectSingleFace(image,
          detectorOpts(this.detectionNet));
      }
      catch (e) {
        throw Error('Detection failed: ' + e);
      }
      if (!detection || !detection.box) {
        throw Error('Detection failed');
      }
      result = {
        box: detection.box,
        dimensions: dims,
        image: image
      };
    }
    //console.log('result', result);
    return result;
  }
}

function pathify(p) {
  return p ? p.replace(/.*\/profiles/, '/profiles') : '__unknown__';
}

export default new ProfileMaker();
