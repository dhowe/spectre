import mongoose from 'mongoose';
import chai_http from 'chai-http';
import server from '../server';
import dotEnv from 'dotenv';
import chai from 'chai';

import UserModel from '../user-model';

const port = 8083;
const env = process.env;
const expect = chai.expect;

dotEnv.config();
chai.use(chai_http);
let host = server;

if (typeof env.API_HOST != 'undefined')
  host = env.API_HOST + ':' + port;

describe('User Routes', () => {

  console.log('\nHost: ' + (env.API_HOST || 'localhost'));

  beforeEach((done) => { // empty db before each test
    UserModel.deleteMany({}, (err) => { done() });
  });

  describe('GET /api/users/similar/:uid', () => {

    it('it should fail on bad id', (done) => {
      let uid = '456';
      chai.request(host)
        .get('/api/users/similar/' + uid)
        .auth(env.API_USER, env.API_PASS)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('it should return [] after one insert', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          name: "Daniel2",
          login: "daniel2@aol.com",
          loginType: "facebook",
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          let uid = res.body._id;
          chai.request(host)
            .get('/api/users/similar/' + uid)
            .auth(env.API_USER, env.API_PASS)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).is.a('array');
              expect(res.body.length).eq(0);
              done();
            });
        });
    });

    it('it should return k-1 similar users after k inserts', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = { name: "dave" + i, login: "dave" + i + "@abc.com", loginType: "twitter" };
        let user = UserModel.Create(data);
        let keys = user.traitNames();
        keys.forEach(k => user.traits[k] = i / 10);
        users.push(user);
      }
      saveUsers(users, u => {
        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_PASS)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(10);
            let uid = res.body[0]._id;
            chai.request(host)
              .get('/api/users/similar/' + uid)
              .auth(env.API_USER, env.API_PASS)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).is.a('array');
                expect(res.body.length).to.eq(9);
                expect(res.body[0].name).to.eq('dave1');
                expect(res.body[8].name).to.eq('dave9');
                done();
              });
          });
      });
    });

    it('it should return 10 similar users after 15 inserts (no limit)', (done) => {

      let users = [];
      for (var i = 0; i < 15; i++) {
        let data = {
          name: "dave" + i,
          login: "dave" + i + "@abc.com",
          loginType: "twitter"
        };
        users.push(UserModel.Create(data))
      }

      saveUsers(users, function () {

        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_PASS)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(15); // sometimes fails ??
            let uid = res.body[0]._id;
            chai.request(host)
              .get('/api/users/similar/' + uid)
              .auth(env.API_USER, env.API_PASS)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).is.a('array');
                expect(res.body.length).to.eq(10);
                done();
              });
          });
      });
    });

    it('it should return 5 similar users after 10 inserts (limit 5)', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = {
          name: "dave" + i,
          login: "dave" + i + "@abc.com",
          loginType: "twitter"
        };
        users.push(UserModel.Create(data))
      }
      saveUsers(users, function () {
        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_PASS)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(10);
            let uid = res.body[0]._id;
            chai.request(host)
              .get('/api/users/similar/' + uid + '?limit=5')
              .auth(env.API_USER, env.API_PASS)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).is.a('array');
                expect(res.body.length).to.eq(5);
                done();
              });
          });
      });
    });
  });

  describe('GET /api/users', () => {

    it('it should return a list of all users', (done) => {
      chai.request(host)
        .get('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .end((err, res) => {
          //console.log(res.body.length+' records');
          expect(res).to.have.status(200);
          expect(res.body).is.a('array');
          expect(res.body.length).to.eq(0);
          done();
        });
    });

    it('it should return [user] after insert', (done) => {
      let uid = -1;
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          name: "Daniel2",
          login: "daniel2@aol.com",
          loginType: "facebook",
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          uid = res.body._id;
          chai.request(host)
            .get('/api/users/')
            .auth(env.API_USER, env.API_PASS)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).is.a('array');
              expect(res.body.length).eq(1);
              expect(res.body[0]._id).eq(uid);
              done();
            });
        });
    });

    it('it should return 10 users after 10 inserts', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = { name: "dave" + i, login: "dave" + i + "@abc.com", loginType: "twitter" };
        let user = UserModel.Create();
        users.push(user);
      }
      saveUsers(users, u => {
        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_PASS)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(10);
            done();
          });
      });
    });
  });

  describe('POST /api/users', () => {

    it('it should not insert user without login', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          name: "Foobar",
          loginType: "facebook",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('it should not insert user without login type', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          login: "foo@cnn.com",
          name: "foo",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('it should not insert user with bad login type', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          login: "foo@cnn.com",
          loginType: "foobar",
          name: "foo",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });
    it('it should not insert user with bad gender', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          login: "foo@cnn.com",
          loginType: "foobar",
          gender: "foobar",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should not violate unique login/type constraint', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          name: "Dave",
          login: "da@aol.com",
          loginType: "facebook",
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          chai.request(host)
            .post('/api/users')
            .auth(env.API_USER, env.API_PASS)
            .send({
              name: "Dave",
              login: "da@aol.com",
              loginType: "facebook",
            })
            .end((err, res) => {
              if (err) throw err;
              expect(res).to.have.status(400);
              expect(res.body).is.a('object');
              expect(res.body).has.property('error');
              done();
            });
        });
    });

    it('it should insert a complete user record', (done) => {
      let user = {
        name: "daniel2",
        login: "daniel2@aol.com",
        loginType: "facebook",
        traits: {
          agreeableness: 0.2038,
          conscientiousness: 0.2324,
          extraversion: 0.2229,
          openness: 0.246,
          neuroticism: 0.465
        }
      };
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send(user)
        .end((err, res) => {
          if (err) throw err;
          //console.log('err', res.body);
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.name).eq(user.name);
          expect(res.body.traits.openness).eq(user.traits.openness);
          done();
        });
    });
  });

  describe('GET /api/users/:uid', () => {

    it('it should fail on bad id', (done) => {
      let uid = '456';
      chai.request(host)
        .get('/api/users/' + uid)
        .auth(env.API_USER, env.API_PASS)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('it should get a user after insertion', (done) => {
      let uid = -1;
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_PASS)
        .send({
          name: "Daniel2",
          login: "daniel2@aol.com",
          loginType: "facebook",
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          uid = res.body._id;
          chai.request(host)
            .get('/api/users/' + uid)
            .auth(env.API_USER, env.API_PASS)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).is.a('object');
              expect(res.body).has.property('_id');
              expect(res.body._id).eq(uid);
              done();
            });
        });
    });
  });

  function saveUsers(users, cb) {
    let count = users.length;
    users.forEach(function (user) {
      user.save(function (err, result) {
        if (err) throw Error();
        if (--count === 0) return cb(result);
      });
    });
  }
});
