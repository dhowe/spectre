import fs from 'fs';
import path from 'path';
import btoa from 'btoa';
import dotEnv from 'dotenv';
import fetch from 'node-fetch';
import mailer from 'nodemailer';
import { expect } from 'chai';

const mockUser = {
  "_id": "888888888888888888888888",
  "name": "Sally",
  "detectGender": "female",
  "detectGenderProb": .9123,
  "detectAge": "28",
  "clientId": 'localhost',
  "hasImage": true,
  "targetId": "-1",
  // "descriptors": [
  //   "Sally is a perfectionist.",
  //   "She prefers to plan everything to the last detail, which has consequently led to her being very successful and extremely reliable.",
  //   "Sally is far more intellectually curious and sensitive to beauty than most."],
  "virtue": "power",
  "adIssue": "democrat",
  "traits": {
    "openness": 0.8253353111345854, "conscientiousness": 0.8656814140739604,
    "extraversion": 0.6890590896284885, "agreeableness": 0.6008941864440192, "neuroticism": 0.20154338443905195
  },
  "login": "sally4983578918989@mail.com",
  "loginType": "email",
  "gender": "female",
  "createdAt": new Date("2019-06-03T00:12:07.599Z"),
  "updatedAt": new Date("2019-06-03T00:12:07.599Z")
};

describe('Email.fillTemplate', () => {
  it('Should fill in a template for a test user', (done) => {
    loadFile('../templates/email.html').then(tmpl => {
      let message = fillTemplate(tmpl, mockUser);
      expect(message.length).gt(0);
      done();
      //expect(/[^0-9]%/.test(message)).eq(false);
      //saveEmail(message, 'tmp.html').then(done);
    });
  });
});

function loadFile(relativePath) {
  return new Promise((resolve, reject) => {
    const fpath = path.join(__dirname, relativePath);
    return fs.readFile(fpath, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err);
      return resolve(file);
    })
  });
}

function saveEmail(email, fpath = 'output.html') {
  return new Promise((resolve, reject) => {
    fs.writeFile(fpath, email, (err) => {
      if (err) return reject(err);
      console.log('WROTE: ' + process.cwd() + '/' + fpath);
      return resolve();
    });
  });
}

const ucf = function (str) {
  return str[0].toUpperCase() + str.substring(1);
}

function fillTemplate(template, user) {
  return template
    .replace(/%USER.Id%/g, user._id)
    .replace(/%USER.Name%/g, ucf(user.name))
    .replace(/%USER.O%/g, Math.round(user.traits.openness * 100))
    .replace(/%USER.C%/g, Math.round(user.traits.conscientiousness * 100))
    .replace(/%USER.E%/g, Math.round(user.traits.extraversion * 100))
    .replace(/%USER.A%/g, Math.round(user.traits.agreeableness * 100))
    .replace(/%USER.N%/g, Math.round(user.traits.neuroticism * 100))
    /*.replace(/%USER.Summary1%/g, Math.round(user.traits.neuroticism * 100))
    .replace(/%USER.Summary2%/g, Math.round(user.traits.neuroticism * 100))
    .replace(/%USER.Summary3%/g, Math.round(user.traits.neuroticism * 100))*/
}
