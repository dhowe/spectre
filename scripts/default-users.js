/*
 * RUN (from /spectre): $ NODE_ENV=test mocha scripts/default-users.js --exit
 *   result will be in auto_generated_users.js
 */
import mongoose from 'mongoose';
import chai_http from 'chai-http';
import server from '../server';
import dotEnv from 'dotenv';
import chai from 'chai';
import fs from 'fs';

import UserModel from '../user-model';
import User from '../shared/user';

const env = process.env;
const expect = chai.expect;
const port = env.PORT || 8083;

dotEnv.config();
chai.use(chai_http);

let host = server;
if (typeof env.API_HOST != 'undefined')
  host = env.API_HOST + ':' + port;

describe('User Routes', () => {

  beforeEach((done) => { // empty db before each test
    UserModel.deleteMany({}, (err) => {
      err && console.error(err);
      done()
    });
  });

  //describe('User Generator', () => {
    it('should generate a set of default users', (done) => {
      const defaults = [
        {
          _id: '111111111111111111111111',
          login: 'remy@mail.com',
          loginType: 'email',
          name: 'Remy',
          gender: 'male'
        },
        {
          _id: '222222222222222222222222',
          login: 'bailey@mail.com',
          loginType: 'email',
          name: 'Bailey',
          gender: 'male'
        },
        {
          _id: '333333333333333333333333',
          login: 'devin@mail.com',
          loginType: 'email',
          name: 'Devin',
          gender: 'female'
        },
        {
          _id: '444444444444444444444444',
          login: 'tyler@mail.com',
          loginType: 'email',
          name: 'Tyler',
          gender: 'male'
        },
        {
          _id: '555555555555555555555555',
          login: 'fran@mail.com',
          loginType: 'email',
          name: 'Fran',
          gender: 'female'
        },
        {
          _id: '666666666666666666666666',
          login: 'bernard@mail.com',
          loginType: 'email',
          name: 'Bernard',
          gender: 'male'
        },
        {
          _id: '777777777777777777777777',
          login: 'sing@mail.com',
          loginType: 'email',
          name: 'Sing',
          gender: 'male'
        },
        {
          _id: '888888888888888888888888',
          login: 'sally@mail.com',
          loginType: 'email',
          name: 'sally',
          gender: 'female'
        },
        {
          _id: '999999999999999999999999',
          login: 'dick@mail.com',
          loginType: 'email',
          name: 'Dick',
          gender: 'male'
        }
      ];

      function saveAll(records, cb) {
        let users = [];
        records.forEach(r => users.push(User._randomData(new UserModel(r))));
        let count = users.length;
        let result = [];
        users.forEach(user => {
          chai.request(host)
            .post('/api/users/')
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(res).to.have.status(200);
              Object.assign(user, res);
              result.push(user);
              if (--count === 0) return cb(result);
            });
        });
      }

      function updateAll(users, cb) {

        let result = [];
        let count = users.length;
        users.forEach(user => {
          chai.request(host)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(res).to.have.status(200);
              Object.assign(user, res.body);
              result.push(user);
              if (--count === 0) return cb(result);
            });
        });
      }

      saveAll(defaults, function (users) {
        updateAll(users, function (results) {
          // let header = '// ------------------------------ This file was auto-';
          // header += 'generated ------------------------------\nlet users = [';
          fs.writeFileSync('auto_generated_users.json', JSON.stringify(results));
          done();
        });
      });
    });
//  });
});
