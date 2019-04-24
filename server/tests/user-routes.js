import mongoose from 'mongoose';
import chai from 'chai';
import chai_http from 'chai-http';
import server from '../server';
import dotEnv from 'dotenv';

import UserModel from '../user-model';

dotEnv.config();

const env = process.env;
const expect = chai.expect;

chai.use(chai_http);

describe('User Routes', () => {

  beforeEach((done) => { // empty db before each
    UserModel.deleteMany({}, (err) => { done() });
  });

  describe('GET /spectre/users', () => {

    it('it should return a list of all users', (done) => {
      chai.request(server)
        .get('/spectre/users')
        .auth(env.API_USER, env.API_PASS)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).is.a('array');
          expect(res.body.length).to.eq(0);
          done();
        });
    });
  });

  describe('POST /spectre/users', () => {

    it('it should not insert user without login', (done) => {
      chai.request(server)
        .post('/spectre/users')
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
      chai.request(server)
        .post('/spectre/users')
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
      chai.request(server)
        .post('/spectre/users')
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
      chai.request(server)
        .post('/spectre/users')
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
      chai.request(server)
        .post('/spectre/users')
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
          chai.request(server)
            .post('/spectre/users')
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
      chai.request(server)
        .post('/spectre/users')
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

  describe('GET /spectre/users/:uid', () => {
    beforeEach((done) => { // empty the database before each
      UserModel.deleteMany({}, (err) => { done() });
    });
    it('it should fail on bad id', (done) => {
      let uid = '456';
      chai.request(server)
        .get('/spectre/users/' + uid)
        .auth(env.API_USER, env.API_PASS)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('it should get a user after insertion', (done) => {
      let uid = -1;
      chai.request(server)
        .post('/spectre/users')
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
          chai.request(server)
            .get('/spectre/users/' + uid)
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
});
