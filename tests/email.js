import fs from 'fs';
import path from 'path';
import btoa from 'btoa';
import dotEnv from 'dotenv';
import server from '../server';
import mailer from 'nodemailer';
import User from '../shared/user';
import UserModel from '../user-model';

import chai from 'chai';
import chai_http from 'chai-http';

const expect = chai.expect;
dotEnv.config();

const mockUser = {
  "_id": "888888888888888888888888",
  "name": "Sally",
  "gender": "female",
  "genderProb": .9123,
  "age": "28",
  "clientId": 'localhost',
  "hasImage": true,
  "targetId": "-1",
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
      let message = mailer.fillTemplate(tmpl, mockUser);
      expect(message.length).gt(0);
      expect(/%%/.test(message)).eq(false);
      //saveEmail(message, 'templates/tmp.html').then(done);
      done();
    });
  });

  it('Should fill in a template for a db user', (done) => {
    const uid = '666666666666666666666666';
    loadFile('../templates/email.html').then(tmpl => {
      UserModel.findById(uid, (err, user) => {
        if (err) throw Error(err);
        let message = mailer.fillTemplate(tmpl, user);
        expect(message.length).gt(0);
        expect(/%%/.test(message)).eq(false);
        //saveEmail(message, 'templates/tmp.html').then(done);
        done();
      });
    });
  });

  it('Should use id route to fill in a user email template', (done) => {
    const uid = '888888888888888888888888';
    loadFile('../templates/email.html').then(tmpl => {
      chai.request(server)
        .get('/api/users/' + uid)
        .auth(process.env.API_USER, process.env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data._id).eq(uid);
          expect(res.body.data.createdAt).to.be.a('string');
          expect(res.body.data.updatedAt).to.be.a('string');

          let user = User.create(res.body.data);
          expect(user).to.be.a('object');
          expect(user.createdAt).to.be.a('date');
          expect(user.updatedAt).to.be.a('date');
          expect(user._id).eq(uid);

          let message = mailer.fillTemplate(tmpl, user);
          expect(message.length).gt(0);
          expect(/%%/.test(message)).eq(false);
          //saveEmail(message, 'templates/tmp.html').then(done);
          done();
        });
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
      console.log('  WROTE: ' + process.cwd() + '/' + fpath);
      return resolve();
    });
  });
}

const ucf = function(str) {
  return str[0].toUpperCase() + str.substring(1);
}
