import sharp from 'sharp';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs-node';
import observer from 'chokidar';
import clfDate from 'clf-date';
import UserModel from './user-model';

const BRIGHTEN = 1.3;

class ProfileMaker {

  constructor(modelDir) {
    this.border = 200;
    this.loaded = false;
    this.detectAgeGender = true;
    this.modelDir = modelDir || './model-weights';
    this.detectionNet = faceapi.nets.ssdMobilenetv1;
    this.ageGenderNet = faceapi.nets.ageGenderNet;
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    this.loadModels();
  }

  watch = (path) => {
    console.log('[' + clfDate() + '] ::* WATCH ' + path);
    observer.watch(path, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: true
    })
      .on('add', this.onNewImage)
      .on('change', this.onNewImage);
  }

  onNewImage = (path) => {

    if (/^.*\/[a-f\d]{24}_raw\.jpg$/i.test(path)) {

      console.log('[' + clfDate() + '] ::* FOUND ' + pathify(path));

      try {
        const tmp = path.replace(/_raw\.jpg/, '');
        const id = tmp.substring(tmp.lastIndexOf('/') + 1);
        const outfile = tmp + '.jpg';

        this.makeThumbnail(path, outfile)
          .then(res => {
            if (res.status === 'ok') {
              console.log('[' + clfDate() + '] ::* WROTE ' + pathify(outfile));

              if (this.detectAgeGender) console.log('[' + clfDate()
                + '] ::* DETECTED ' + res.data.age + '/' + res.data.gender
                + '(' + res.data.genderProbability + ')');
            }
            else {
              console.error('[' + clfDate() + '] ::* THUMB Failed', res.data);
            }

            const fieldsToUpdate = { hasImage: res.status === 'ok' };
            if (this.detectAgeGender && res.status === 'ok') {
              Object.assign(fieldsToUpdate, {
                detectedAge: res.data.age || -1,
                detectedGender: res.data.gender || 'unknown',
                detectedGenderProb: res.data.genderProbability || -1,
              });
            }

            //console.log('[' + clfDate() + '] ::* DETECT ', fieldsToUpdate);

            // We have successfully detect the face, then cropped and
            // processed the image, now update the db with this info
            UserModel.findByIdAndUpdate(id,
              fieldsToUpdate, { new: true }, (err, u) => {
                err && console.error('[ERROR] ProfileMaker.update: ', err, u);
                console.log('[' + clfDate() + '] ::* UPDATED hasImage:', u.hasImage);
              });
          });
      }
      catch (e) {
        console.error('[ERROR] ProfileMaker[4]: ' + path + '\n' + e);
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
      if (!result) throw Error('No face-detection result');

      await sharp(infile)
        .extract(bounds(result.box, result.dimensions.w, result.dimensions.h))
        .modulate({ brightness: BRIGHTEN }) // increase lightness factor
        .resize(width || 128, height || 128)
        .normalise()
        .toFile(outfile);

      return { status: 'ok', data: result };
    }
    catch (e) {
      console.error('[ERROR] THUMBNAIL: ', e);
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
    console.log('[' + clfDate() + '] ::* THUMB Loading face training models');
    await this.detectionNet.loadFromDisk(this.modelDir);
    if (this.detectAgeGender) {
      await this.ageGenderNet.loadFromDisk(this.modelDir);
    }
  }

  detect = async (infile) => {

    const detectorOpts = (net) => {
      return net === faceapi.nets.ssdMobilenetv1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
        : new faceapi.TinyFaceDetectorOptions
          ({ inputSize: 408, scoreThreshold: 0.5 });
    }
    const image = await canvas.loadImage(infile);
    // await sharp(infile).metadata().then(md => {
    //   dims = { w: md.width, h: md.height };
    // });
    const md = await sharp(infile).metadata();
    const dims = { w: md.width, h: md.height };

    console.log('[' + clfDate() + '] ::* CANVAS ', dims, pathify(infile));

    // TODO: withFaceLandmarks().withFaceDescriptor()

    if (this.detectAgeGender) {
      const detection = await faceapi.detectSingleFace(image,
        detectorOpts(this.detectionNet)).withAgeAndGender();
      if (!detection) throw Error('Detection failed[0] null-result');
      return {
        age: detection.age,
        gender: detection.gender,
        genderProbability: detection.genderProbability,
        box: detection.detection.box,
        dimensions: dims,
        image: image
      }
    }
    else {
      try {
        const detection = await faceapi.detectSingleFace(image,
          detectorOpts(this.detectionNet));
        if (typeof detection === 'undefined'
          || typeof detection.box === 'undefined') {
          throw Error('No detection returned');
        }
        return {
          box: detection.box,
          dimensions: dims,
          image: image
        };
      }
      catch (e) {
        throw Error('Detection failed[1] ' + e);
      }
    }
  }
}

function pathify(p) {
  return p ? p.replace(/.*\/profiles/, '/profiles') : '__unknown__';
}

export default ProfileMaker;
