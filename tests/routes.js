import chai_http from 'chai-http';
import server from '../server';
import dotEnv from 'dotenv';
import chai from 'chai';

import DefaultUsers from '../client/src/Components/UserSession/default-users';
import UserModel from '../user-model';
import User from '../shared/user';

const env = process.env;
const expect = chai.expect;
const clientId = 'localhost';

dotEnv.config();
chai.use(chai_http);

const dUser = DefaultUsers[0];
expect(dUser.createdAt).to.be.a('date');
expect(dUser.createdAt.getTime()).eq(User.epochDate.getTime());

describe('REST API', () => {

  let refreshDb = (done) => {
    UserModel.deleteMany({}, (err) => {
      err && console.error('ERROR', err);
      let users = DefaultUsers;
      chai.request(server)
        .post('/api/users/batch/')
        .auth(env.API_USER, env.API_SECRET)
        .send(users)
        .end((err, res) => {
          users = res.body.data;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          let user = User.create(res.body.data[0]);
          expect(user.createdAt).to.be.a('date');
          expect(user.createdAt.getTime()).eq(new Date(1970, 1, 1).getTime());
          expect(user.updatedAt).to.be.a('date');
          done();
        });
    });
  }

  //it('should prepare db', refreshDb);

  describe('User Routes', () => {

    beforeEach(refreshDb);

    it('should fetch a single user by id', done => {
      let id = '888888888888888888888888';
      chai.request(server)
        .get('/api/users/' + id)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data._id).eq(id);
          expect(res.body.data.createdAt).to.be.a('string');
          expect(res.body.data.updatedAt).to.be.a('string');

          let user = User.create(res.body.data);
          expect(user).to.be.a('object');
          expect(user.createdAt).to.be.a('date');
          expect(user.updatedAt).to.be.a('date');

          expect(user._id).eq(id);
          done();
        });
    });

    it('should check a user image by id', done => {
      let id = '888888888888888888888888'; // a good id
      chai.request(server)
        .get('/api/users/photo/' + id)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('boolean');
          expect(res.body.data).eq(true);

          id = 'XXX8888888888888888888888'; // a bad id
          chai.request(server)
            .get('/api/users/photo/' + id)
            .auth(env.API_USER, env.API_SECRET)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('boolean');
              expect(res.body.data).eq(false);
              done();
            });
        });
    });

    it('should fetch a single user by login', done => {
      let id = '888888888888888888888888';
      let login = 'sally4983578918989@mail.com';
      chai.request(server)
        .get('/api/users/email/' + login)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data._id).eq(id);
          expect(res.body.data.createdAt).to.be.a('string');
          expect(res.body.data.updatedAt).to.be.a('string');

          let user = User.create(res.body.data);
          expect(user).to.be.a('object');
          expect(user.createdAt).to.be.a('date');
          expect(user.updatedAt).to.be.a('date');
          expect(user._id).eq(id);
          expect(user.login).eq(login);
          expect(user.loginType).eq('email');
          done();
        });
    });

    // it('should send mail to single user', done => {
    //   let id = '888888888888888888888888';
    //   chai.request(server)
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
      chai.request(server)
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
      chai.request(server)
        .get('/api/users/' + id)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          let user = User.create(res.body.data);
          expect(user._id).eq(id);
          expect(user.hasImage).eq(true);
          //expect(user.similars).to.be.undefined;
          user.hasImage = false;

          chai.request(server)
            .put('/api/users/' + id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');

              user.assign(res.body.data);
              expect(user.hasImage).eq(false);

              id = '888888888888888888888888';
              chai.request(server)
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

    it('should return more recent targets before older', done => {
      let user = new User();
      user.clientId = clientId;
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";

      chai.request(server)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          user.assign(res.body.data);
          expect(user._id).to.be.a('string');

          user.traits = User.randomTraits();
          user.updatedAt = new Date();
          user.hasImage = true;
          user.age = 30;

          // update Dave
          chai.request(server)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              expect(res.body.data.clientId).eq(user.clientId);
              expect(res.body.data.similars).to.be.an('array');
              expect(res.body.data.similars.length).eq(6);

              // create Dave2
              user = new User();
              user.clientId = clientId;
              user.name = "Dave2";
              user.login = "Dave2@aol.com";
              user.gender = "male";

              chai.request(server)
                .post('/api/users/')
                .auth(env.API_USER, env.API_SECRET)
                .send(user)
                .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body.data).to.be.a('object')
                  user.assign(res.body.data);
                  expect(user._id).to.be.a('string');

                  user.traits = User.randomTraits();
                  user.updatedAt = new Date();
                  user.hasImage = true;
                  user.age = 39;

                  // update Dave2
                  chai.request(server)
                    .put('/api/users/' + user._id)
                    .auth(env.API_USER, env.API_SECRET)
                    .send(user)
                    .end((err, res) => {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      expect(res.body.data).to.be.a('object')
                      expect(res.body.data._id).to.be.a('string');
                      expect(res.body.data.clientId).eq(user.clientId);
                      expect(res.body.data.similars).to.be.an('array');
                      expect(res.body.data.similars.length).eq(6);

                      let u = User.create(res.body.data);
                      expect(u).to.be.a('object')
                      expect(u._id).to.be.a('string');
                      expect(u.clientId).eq(user.clientId);
                      expect(u.similars).to.be.an('array');
                      expect(u.similars.length).eq(6);

                      //delete res.body.data.similars && console.log(res.body.data);

                      // Now check recents
                      let id = '111111111111111111111111';
                      // result should be [ 'Dave2', 'Dave']
                      chai.request(server)
                        .get('/api/users/targets/' + id)
                        .auth(env.API_USER, env.API_SECRET)
                        .end((err, res) => {
                          expect(err).to.be.null;
                          expect(res).to.have.status(200);
                          expect(res.body.data).to.be.an('array');
                          let recents = res.body.data.map(j => User.create(j))

                          //console.log(recents.map(s => s._id + '/' + s.name));
                          expect(recents.length).eq(6);
                          expect(recents[0]).to.be.a('object');
                          expect(recents[0]._id).to.be.a('string');
                          expect(recents[0].name).eq('Dave2');
                          expect(recents[1]).to.be.a('object');
                          expect(recents[1]._id).to.be.a('string');
                          expect(recents[1].name).eq('Dave');
                          expect(recents.map(r => r._id)).not.to.include(id);
                          done();
                        });
                    });
                });
            });
        });
    });

    it('should return more recent users before older', done => {
      let user = new User();
      user.clientId = clientId;
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";
      chai.request(server)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          user.assign(res.body.data);
          expect(user._id).to.be.a('string');

          user.traits = User.randomTraits();
          user.updatedAt = new Date();
          user.hasImage = true;
          user.age = 29;

          // update Dave
          chai.request(server)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              expect(res.body.data.clientId).eq(user.clientId);
              expect(res.body.data.similars).to.be.an('array');
              expect(res.body.data.similars.length).eq(6);

              // create Dave2
              user = new User();
              user.clientId = clientId;
              user.name = "Dave2";
              user.login = "Dave2@aol.com";
              user.gender = "male";
              chai.request(server)
                .post('/api/users/')
                .auth(env.API_USER, env.API_SECRET)
                .send(user)
                .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body.data).to.be.a('object')
                  user.assign(res.body.data);
                  expect(user._id).to.be.a('string');

                  user.traits = User.randomTraits();
                  user.updatedAt = new Date();
                  user.hasImage = true;
                  user.age = 29;

                  // update Dave2
                  chai.request(server)
                    .put('/api/users/' + user._id)
                    .auth(env.API_USER, env.API_SECRET)
                    .send(user)
                    .end((err, res) => {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      expect(res.body.data).to.be.a('object')
                      expect(res.body.data._id).to.be.a('string');
                      expect(res.body.data.clientId).eq(user.clientId);
                      expect(res.body.data.similars).to.be.an('array');
                      expect(res.body.data.similars.length).eq(6);

                      //delete res.body.data.similars && console.log(res.body.data);

                      // Now check recents
                      let id = '111111111111111111111111';
                      // result should be [ 'Dave2', 'Dave']
                      chai.request(server)
                        .get('/api/users/recents/' + id + '?limit=2')
                        .auth(env.API_USER, env.API_SECRET)
                        .end((err, res) => {
                          expect(err).to.be.null;
                          expect(res).to.have.status(200);
                          expect(res.body.data).to.be.an('array');

                          let recents = res.body.data.map(j => User.create(j))

                          //console.log(recents.map(s => s._id + '/' + s.name));
                          expect(recents.length).eq(2);
                          expect(recents[0]).to.be.a('object');
                          expect(recents[0]._id).to.be.a('string');
                          expect(recents[0].name).eq('Dave2');
                          expect(recents[1]).to.be.a('object');
                          expect(recents[1]._id).to.be.a('string');
                          expect(recents[1].name).eq('Dave');
                          expect(recents.map(r => r._id)).not.to.include(id);
                          done();
                        });
                    });
                });
            });
        });
    });

    it('should return recent user before any defaults', done => {
      let user = new User();
      user.clientId = clientId;
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";
      chai.request(server)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          user.assign(res.body.data);
          expect(user._id).to.be.a('string');

          //user.clientId = Math.floor(Math.random() * 5) + 1;
          user.traits = User.randomTraits();
          user.updatedAt = new Date();
          user.hasImage = true;
          user.age = 28;

          chai.request(server)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              //expect(res.body.data.clientId).to.be.a('number');
              expect(res.body.data.clientId).eq(user.clientId);
              expect(res.body.data.similars).to.be.an('array');
              expect(res.body.data.similars.length).eq(6);

              //delete res.body.data.similars && console.log(res.body.data);

              let id = '111111111111111111111111';
              // result must always include recently added 'Dave'
              chai.request(server)
                .get('/api/users/recents/' + id + '?limit=1')
                .auth(env.API_USER, env.API_SECRET)
                .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body.data).to.be.an('array');
                  let recents = res.body.data;
                  //console.log(recents.map(s => s._id + '/' + s.name));
                  expect(recents.length).eq(1);
                  expect(recents[0]).to.be.a('object');
                  expect(recents[0]._id).to.be.a('string');
                  expect(recents.map(r => r._id)).not.to.include(id);
                  done();
                });
            });
        });
    });

    it('should list all users', done => {
      chai.request(server)
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
      user.clientId = clientId;
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";
      chai.request(server)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          expect(res.body.data._id).to.be.a('string');
          user.assign(res.body.data);

          expect(user._id).to.be.a('string');
          chai.request(server)
            .get('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object');
              expect(res.body.data._id).eq(user._id);
              //expect(res.body.data.similars).to.be.an('array');
              done();
            });
        });
    });

    it('should insert, then update a user', done => {
      let user = new User();
      user.clientId = clientId;
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";

      chai.request(server)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          expect(res.body.data._id).to.be.a('string');
          //expect(res.body.data.similars.length).eq(0);
          user.assign(res.body.data);

          expect(user._id).to.be.a('string');
          expect(user.traits).to.be.an('object');
          expect(user.traits.openness).eq(-1);

          chai.request(server)
            .put('/api/users/' + user._id)
            .auth(env.API_USER, env.API_SECRET)
            .send(user)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.a('object')
              expect(res.body.data._id).to.be.a('string');
              //expect(res.body.data.similars).to.be.an('array');
              //expect(res.body.data.similars.length).eq(0);
              done();
            });
        });
    });

    it('should insert, then update a user with traits', done => {
      let user = new User();
      user.clientId = clientId;
      user.name = "Dave";
      user.login = "Dave@aol.com";
      user.gender = "male";
      user.age = 50
      user.gender = "female";
      user.genderProb = .4567
      user.adIssue = 'democrat';
      user.virtue = 'truth';

      chai.request(server)
        .post('/api/users/')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object')
          //console.log(res.body.data);
          expect(res.body.data.age).to.be.a('number');
          expect(res.body.data.gender).to.be.a('string');
          expect(res.body.data.genderProb).to.be.a('number');

          expect(res.body.data._id).to.be.a('string');
          //expect(res.body.data.similars.length).eq(0);

          user.assign(res.body.data);

          //console.log(user);
          expect(user._id).to.be.a('string');
          user.traits = User.randomTraits();
          expect(user.traits).to.be.a('object');
          expect(user.traits.openness).to.be.gte(0);

          chai.request(server)
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
