const mongoose = require('mongoose');
const chai = require('chai');
const server = require('../../server');
const User = require('../../user-model');

chai.use(require('chai-http'));
const expect = chai.expect;

describe('User Routes', () => {

  beforeEach((done) => { // empty the database before each
    User.deleteMany({}, (err) => { done() });
  });

  describe('POST /spectre/api/users', () => {

    it('it should not insert user without login', (done) => {
      chai.request(server)
        .post('/spectre/api/users')
        .send({
          name: "Daniel2",
          loginType: "facebook",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('it should not insert user without name', (done) => {
      chai.request(server)
        .post('/spectre/api/users')
        .send({
          login: "dan@cnn.com",
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
        .post('/spectre/api/users')
        .send({
          login: "dan@cnn.com",
          name: "bill",
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
        .post('/spectre/api/users')
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
            .post('/spectre/api/users')
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
            });
          done();
        });
    });

    it('it should insert a complete user record', (done) => {
      let user = {
        name: "test",
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
        .post('/spectre/api/users')
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

  describe('GET /spectre/api/users', () => {
    it('it should return a list of all users', (done) => {
      chai.request(server)
        .get('/spectre/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).is.a('array');
          expect(res.body.length).to.eq(0);
          done();
        });
    });
  });

  describe('GET /spectre/api/users/:uid', () => {
    it('it should fail on bad id', (done) => {
      let uid = '456';
      chai.request(server)
        .get('/spectre/api/users/' + uid)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });
    it('it should get a user after insertion', (done) => {
      let uid = -1;
      chai.request(server)
        .post('/spectre/api/users')
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
            .get('/spectre/api/users/' + uid)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).is.a('object');
              expect(res.body).has.property('_id');
              expect(res.body._id).eq(uid);
            });
          done();
        });
    });
  });
});
