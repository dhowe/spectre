import chai_http from 'chai-http';
import server from '../../server';
import dotEnv from 'dotenv';
import chai from 'chai';

import DefaultUsers from '../../client/src/Components/UserSession/default-users';
import UserModel from '../../user-model';
import User from '../../shared/user';

const env = process.env;
const expect = chai.expect;
const port = env.PORT || 8083;

dotEnv.config();
chai.use(chai_http);

let host = server;
if (typeof env.API_HOST !== 'undefined') {
  host = env.API_HOST + ':' + port;
}

describe('REST API', () => {
  describe('User Routes', () => {

    let users = DefaultUsers;
    let refreshDb = done => {
      UserModel.deleteMany({}, (err) => {
        err && console.error('ERROR', err);
        expect(DefaultUsers.length).eq(9);
        chai.request(host)
          .post('/api/users/batch/')
          .auth(env.API_USER, env.API_SECRET)
          .send(users)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.data.length).eq(9);
            done();
          });
      });
    }


    beforeEach(refreshDb);

    it('should fetch a single user', done => {
      let id = '888888888888888888888888';
      chai.request(host)
        .get('/api/users/' + id)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data._id).eq(id);
          expect(res.body.data.similars).to.be.undefined;
          done();
        });
    });

    // it('should send mail to single user', done => {
    //   let id = '888888888888888888888888';
    //   chai.request(host)
    //     .get('/api/users/message/' + id)
    //     .auth(env.API_USER, env.API_SECRET)
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(200);
    //       expect(res.body.data).to.be.a('object');
    //       expect(res.body.data.accepted).to.be.an('array');
    //       expect(res.body.data.accepted[0]).eq('spectre-test@email.com');
    //       done();
    //     });
    // }).timeout(5000);

    it('should find similars for a user', done => {
      let id = '888888888888888888888888';
      let limit = 6;
      chai.request(host)
        .get('/api/users/similars/' + id + '?limit=' + limit)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          let similars = res.body.data;
          //console.log(similars.map(s => s._id));
          expect(similars.length).eq(6);
          expect(similars[0]).to.be.a('object');
          expect(similars[0]._id).to.be.a('string');
          for (var i = 0; i < similars.length; i++) {
            expect(similars[i]._id).to.not.equal(id);
          }
          done();
        });
    });

    it('should ignore similars without an image', done => {
      let id = '111111111111111111111111';
      chai.request(host)
        .get('/api/users/' + id)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          let user = res.body.data;
          expect(user._id).eq(id);
          expect(user.hasImage).eq(true);
          expect(user.similars).to.be.undefined;
          user.hasImage = false;

          chai.request(host)
            .put('/api/users/' + id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              Object.assign(user, res.body.data);
              expect(user.hasImage).eq(false);

              id = '888888888888888888888888';
              chai.request(host)
                .get('/api/users/similars/' + id + '?limit=' + 7)
                .auth(env.API_USER, env.API_SECRET)
                .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body.data).to.be.an('array');
                  let similars = res.body.data;
                  //console.log(similars.map(s => s._id));
                  expect(similars.length).eq(7);
                  expect(similars[0]).to.be.a('object');
                  expect(similars[0]._id).to.be.a('string');
                  for (var i = 0; i < similars.length; i++) {
                    expect(similars[i]._id).to.not.equal(id);
                  }
                  done();
                });
            });
        });
    });

    it('should return recent user before any defaults', done => {
      let user = new User();
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";
      chai.request(host)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          Object.assign(user, res.body.data);
          expect(user._id).to.be.a('string');

          user.clientId = Math.floor(Math.random() * 5) + 1;
          user.traits = User.randomTraits();
          user.lastUpdate = Date.now();
          user.hasImage = true;

          chai.request(host)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              expect(res.body.data.clientId).to.be.a('number');
              expect(res.body.data.clientId).eq(user.clientId);
              expect(res.body.data.similars).to.be.an('array');
              expect(res.body.data.similars.length).eq(6);

              //delete res.body.data.similars && console.log(res.body.data);

              let id = '111111111111111111111111';
              // result must always include recently added 'Dave'
              chai.request(host)
                .get('/api/users/recents/' + id)
                .auth(env.API_USER, env.API_SECRET)
                .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body.data).to.be.an('array');
                  let recents = res.body.data;
                  //console.log(recents.map(s => s._id + '/' + s.clientId));
                  expect(recents[0]).to.be.a('object');
                  expect(recents[0]._id).to.be.a('string');
                  expect(recents.map(r => r._id)).not.to.include(id);
                  expect(recents.map(r => r._id)).to.include(user._id,
                    recents.map(s => s._id + '/' + s.clientId));
                  expect(recents.map(r => r.clientId)).to.include(user.clientId);
                  done();
                });
            });
        });
    });

    it('should list all users', done => {
      chai.request(host)
        .get('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should fetch users from model', done => {
      UserModel.getAll((err, users) => {
        expect(err).to.be.null;
        expect(users.length).eq(9);
        done();
      });
    });

    it('should insert a new user, then fetch it', done => {
      let user = new User();
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";
      chai.request(host)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          expect(res.body.data._id).to.be.a('string');
          Object.assign(user, res.body.data);

          expect(user._id).to.be.a('string');
          chai.request(host)
            .get('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object');
              expect(res.body.data._id).eq(user._id);
              expect(res.body.data.similars).to.be.an('array');
              done();
            });
        });
    });

    it('should insert, then update a user', done => {
      let user = new User();
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";

      chai.request(host)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          expect(res.body.data._id).to.be.a('string');
          expect(res.body.data.similars.length).eq(0);
          Object.assign(user, res.body.data);

          expect(user._id).to.be.a('string');
          expect(user.traits).to.be.undefined;

          chai.request(host)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              expect(res.body.data.similars).to.be.an('array');
              expect(res.body.data.similars.length).eq(0);
              done();
            });
        });
    });

    it('should insert, then update a user with traits', done => {
      let user = new User();
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";

      chai.request(host)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          expect(res.body.data._id).to.be.a('string');
          expect(res.body.data.similars.length).eq(0);

          Object.assign(user, res.body.data);

          //console.log(user);
          expect(user._id).to.be.a('string');
          user.traits = User.randomTraits();
          expect(user.traits).to.be.a('object');
          expect(user.traits.openness).to.be.gte(0);

          chai.request(host)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              expect(res.body.data.similars).to.be.an('array');
              expect(res.body.data.similars.length).eq(6);
              expect(res.body.data.similars[0]).to.be.an('object');
              expect(res.body.data.similars[0]._id).to.be.an('string');
              expect(res.body.data.similars[0].similars).to.be.undefined;
              //expect(res.body.data.similars[0].similars.length).eq(0);
              done();
            });
        });
    });

    after(refreshDb);
  });
});
