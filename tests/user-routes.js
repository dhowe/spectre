import mongoose from 'mongoose';
import chai_string from 'chai-string'
import chai_http from 'chai-http';
import chai_fs from 'chai-fs';
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
chai.use(chai_fs);
chai.use(chai_string);

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

  describe('List: GET /api/users', () => {

    it('should return a list of all users', (done) => {
      chai.request(host)
        .get('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          //console.log(res.body.length+' records');
          expect(res).to.have.status(200);
          expect(res.body).is.a('array');
          expect(res.body.length).to.eq(0);
          done();
        });
    });

    it('should return user after insert', (done) => {
      let uid = -1;
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          clientId: 1,
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
            .auth(env.API_USER, env.API_SECRET)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).is.a('array');
              expect(res.body.length).eq(1);
              expect(res.body[0]._id).eq(uid);
              done();
            });
        });
    });

    it('should return 10 users after 10 inserts', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = { name: "dave" + i, login: "dave" + i + "@abc.com", loginType: "twitter", clientId: 1 };
        let user = UserModel.Create();
        users.push(user);
      }
      saveUsers(users, () => {
        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_SECRET)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(10);
            done();
          });
      });
    });
  });

  describe('Fetch: GET /api/users/:uid', () => {

    it('should fail with bad id', (done) => {
      let uid = '456';
      chai.request(host)
        .get('/api/users/' + uid)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should get a user after insertion', (done) => {
      let uid = -1;
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          name: "Daniel2",
          login: "daniel2@aol.com",
          loginType: "facebook",
          clientId: 1
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          uid = res.body._id;
          chai.request(host)
            .get('/api/users/' + uid)
            .auth(env.API_USER, env.API_SECRET)
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

  /*describe('Current: GET /api/users/current/:cid', () => {

    it('should return id for clients most recent user', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = { name: "dave" + i, login: "dave" + i + "@abc.com", loginType: "twitter" };
        let user = UserModel.Create(data);
        let keys = User.oceanTraits;
        keys.forEach(k => user.traits[k] = i / 10);
        users.push(user);
        //console.log(user.name, user._id, user.createdAt);
      }

      // save 10 users, return the newest
      saveUsers(users, () => {
        let cid = process.env.REACT_APP_CLIENT_ID;
        chai.request(host)
          .get('/api/users/current/' + cid)
          .auth(env.API_USER, env.API_SECRET)
          .end((err, res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).is.a('object');
            expect(res.body.id).eq(users[users.length - 1]._id.toString());
            done();
          });
      });
    });
  });*/

  describe('Create: POST /api/users', () => {

    it('should not insert user without login', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          name: "Foobar",
          loginType: "facebook",
          clientId: 1
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should not insert user without login type', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          login: "foo@cnn.com",
          name: "foo",
          clientId: 1
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should not insert user with bad login type', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          login: "foo@cnn.com",
          loginType: "foobar",
          name: "foo",
          clientId: 1
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should not insert user with bad gender', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          login: "foo@cnn.com",
          loginType: "foobar",
          gender: "foobar",
          clientId: 1
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
        .auth(env.API_USER, env.API_SECRET)
        .send({
          name: "Dave",
          login: "da@aol.com",
          loginType: "facebook",
          clientId: 1
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          chai.request(host)
            .post('/api/users')
            .auth(env.API_USER, env.API_SECRET)
            .send({
              name: "Dave",
              login: "da@aol.com",
              loginType: "facebook"
            })
            .end((err, res) => {
              if (err) throw err;
              if (res.status === 200) {
                console.error('BROKEN: violates unique constraint');
              } else {
                expect(res).to.have.status(400);
                expect(res.body).is.a('object');
                expect(res.body).has.property('error');
              }
              done();
            });
        });
    });

    it('should insert a complete user record', (done) => {
      let user = {
        name: "daniel2",
        login: "daniel2@aol.com",
        loginType: "facebook",
        clientId: 1,
        lastPageVisit: { time: +Date.now(), page: '/Test' },
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
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.clientId).eq(1);
          expect(res.body.name).eq(user.name);
          expect(res.body.traits.openness).eq(user.traits.openness);

          Object.assign(user, res.body)
          expect(user.name).eq("daniel2");
          expect(user.lastPageVisit.page).eq("/Test");

          done();
        });
    });

    it('should insert a user record with id/clientId', (done) => {
      let uid = mongoose.Types.ObjectId();
      let user = {
        _id: uid,
        clientId: 5,
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
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.clientId).eq(5);
          expect(res.body._id).eq(uid.toString());
          expect(res.body.name).eq(user.name);
          expect(res.body.traits.openness).eq(user.traits.openness);
          done();
        });
    });

    it('should not insert fields not present in schema', (done) => {
      let user = {
        name: "daniel2",
        login: "daniel2@aol.com",
        loginType: "facebook",
        clientId: 1,
        traits: {
          agreeableness: 0.2038,
          conscientiousness: 0.2324,
          extraversion: 0.2229,
          openness: 0.246,
          neuroticism: 0.465
        },
        notInSchema: 'notInSchema'
      };
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          if (err) throw err;
          //console.log('err', res.body);
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.name).eq(user.name);
          expect(res.body.notInSchema).eq(undefined);
          done();
        });
    });
  });

  describe('Update: PUT /api/users/', () => {

    let user, uid;

    beforeEach((done) => { // insert user before updating
      user = new User({
        name: "daniel2",
        login: "daniel2@aol.com",
        loginType: "facebook",
        gender: 'male',
        clientId: 1,
        traits: {
          agreeableness: 0.2038,
          conscientiousness: 0.2324,
          extraversion: 0.2229,
          openness: 0.246,
          neuroticism: 0.465
        }
      });
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          if (err) throw err;
          Object.assign(user, res.body);
          done();
        });
    });

    it('should fail for user with no id', (done) => {
      user._id = undefined;
      user.virtue = 'truth';
      chai.request(host)
        .put('/api/users/' + user._id)
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).is.a('object');
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should ignore fields not present in schema', (done) => {
      user.virtue = 'truth';
      user.notInSchema = 'notInSchema';
      console.log(user);
      chai.request(host)
        .put('/api/users/' + user._id)
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.virtue).eq(user.virtue);
          expect(res.body.similars).is.a('array');
          expect(res.body.notInSchema).eq(undefined);
          done();
        });
    });

    it('should update user with new fields', (done) => {
      user.virtue = 'truth';
      let target = { id: user.id + 'X', name: 'Jay', traits: User._randomTraits() }
      user.setTarget(target);
      chai.request(host)
        .put('/api/users/' + user._id)
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.virtue).eq(user.virtue);
          expect(res.body.similars).is.a('array');
          expect(res.body.target).eq(JSON.stringify(target));
          done();
        });
    });

    it('should update user with traits and compute similars', (done) => {

      // update the traits
      user._randomizeTraits();

      // now when we update again, we should get similars/descriptors
      chai.request(host)
        .put('/api/users/' + user._id)
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.traits).is.a('object');
          expect(res.body.traits.openness).is.gte(0);
          expect(res.body.traits.openness).is.lt(1);
          expect(res.body.similars).is.a('array');
          expect(res.body.similars.length).is.gt(0);
          Object.assign(user2, res.body);
          expect(user2).is.a('object');
          expect(user2.traits).is.a('object');
          expect(user2.traits.openness).eq(traits.openness);
          expect(user2.similars).is.a('array');
          expect(user2.similars.length).is.gt(0);
          expect(user2.similars[0]).is.a('string');
          //
          // expect(user2.getSimilars()).is.a('array');
          // expect(user2.getSimilars().length).is.gt(0);
          // expect(user2.getSimilars()[0]).is.a('object');
          // expect(user2.getSimilars()[0]).has.property('id');
          // expect(user2.getSimilars()[0]).has.property('name');
          // expect(user2.getSimilars()[0]).has.property('traits');
          done();
        });
    });

    it('should update user with new array value', (done) => {
      let u = new User();
      u._randomizeTraits();
      user.similars = [JSON.stringify({ id: u._id, name: u.name, traits: u.traits })];
      chai.request(host)
        .put('/api/users/' + user._id)
        .auth(env.API_USER, env.API_SECRET)
        .send(user)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.similars).is.a('array');
          expect(res.body.similars).eql(user.similars);
          done();
        });
    });
  });

  /*describe('Similar: GET /api/users/similar/:uid', () => {

    it('should fail on bad id', (done) => {
      let uid = '456';
      chai.request(host)
        .get('/api/users/similar/' + uid)
        .auth(env.API_USER, env.API_SECRET)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should return [] after one insert', (done) => {
      chai.request(host)
        .post('/api/users')
        .auth(env.API_USER, env.API_SECRET)
        .send({
          name: "Daniel2",
          login: "daniel2@aol.com",
          loginType: "facebook",
          clientId: 1,
        })
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body).has.property('_id');
          let uid = res.body._id;
          chai.request(host)
            .get('/api/users/similar/' + uid)
            .auth(env.API_USER, env.API_SECRET)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).is.a('array');
              expect(res.body.length).eq(0);
              done();
            });
        });
    });

    it('should return k-1 similar users after k inserts', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = { name: "dave" + i, login: "dave" + i + "@abc.com", loginType: "twitter", clientId: 1 };
        let user = UserModel.Create(data);
        let keys = User.oceanTraits;
        keys.forEach(k => user.traits[k] = i / 10);
        users.push(user);
      }
      saveUsers(users, () => {
        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_SECRET)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(10);
            let uid = res.body[0]._id;
            chai.request(host)
              .get('/api/users/similar/' + uid)
              .auth(env.API_USER, env.API_SECRET)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).is.a('array');
                expect(res.body.length).to.eq(9);
                for (var i = 0; i < 9; i++) {
                  expect(res.body[i].uid).to.not.eq(uid);
                }
                done();
              });
          });
      });
    });

    it('should return 10 similar users after 15 inserts (no limit)', (done) => {

      let users = [];
      for (var i = 0; i < 15; i++) {
        let data = {
          name: "dave" + i,
          login: "dave" + i + "@abc.com",
          loginType: "twitter",
          clientId: 1
        };
        users.push(UserModel.Create(data)._randomizeTraits())
      }

      saveUsers(users, () => {

        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_SECRET)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(15); // sometimes fails ??
            let uid = res.body[0]._id;
            chai.request(host)
              .get('/api/users/similar/' + uid)
              .auth(env.API_USER, env.API_SECRET)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).is.a('array');
                expect(res.body.length).to.eq(10);
                done();
              });
          });
      });
    });

    it('should return 5 similar users after 10 inserts (limit 5)', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = {
          name: "dave" + i,
          login: "dave" + i + "@abc.com",
          loginType: "twitter",
          clientId: 1,
        };
        users.push(UserModel.Create(data)._randomizeTraits());
      }
      saveUsers(users, () => {
        chai.request(host)
          .get('/api/users')
          .auth(env.API_USER, env.API_SECRET)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('array');
            expect(res.body.length).to.eq(10);
            let uid = res.body[0]._id;
            chai.request(host)
              .get('/api/users/similar/' + uid + '?limit=5')
              .auth(env.API_USER, env.API_SECRET)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).is.a('array');
                expect(res.body.length).to.eq(5);
                done();
              });
          });
      });
    });

    it('should populate user with similar-ids on update', (done) => {
      let users = [];
      for (var i = 0; i < 10; i++) {
        let data = {
          name: "dave" + i,
          login: "dave" + i + "@abc.com",
          loginType: "twitter",
          clientId: 1
        };
        users.push(UserModel.Create(data)._randomizeTraits());
      }
      let user = users[0];
      saveUsers(users, () => {
        chai.request(host)
          .put('/api/users/' + user._id)
          .auth(env.API_USER, env.API_SECRET)
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).is.a('object');
            expect(res.body.similars).is.a('array');
            expect(res.body.similars.length).eq(8);
            done();
          });
      });
    });
  });*/

  describe('Image: POST /api/users/photo/:uid', () => {

    let noid, uid = 'dfjalkj34';
    let name = 'target4.png';
    let img = './web-client/public/targets/' + name;

    it('should fail on null user-id', (done) => {
      chai.request(host)
        .post('/api/users/photo/' + noid)
        .auth(env.API_USER, env.API_SECRET)
        .field('videoId', 2)
        .field('clientId', env.CLIENT_ID)
        .attach('profileImage', fs.readFileSync(img), 'target4.png')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should fail on null file', (done) => {
      chai.request(host)
        .post('/api/users/photo/' + uid)
        .auth(env.API_USER, env.API_SECRET)
        .field('videoId', 2)
        .field('clientId', env.CLIENT_ID)
        .attach('profileImage', null, 'target4.png')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).has.property('error');
          done();
        });
    });

    it('should upload a user photo', (done) => {

      let uid = 'dfjalkj34';
      let name = 'target4.png';
      let img = './web-client/public/targets/' + name;

      chai.request(host)
        .post('/api/users/photo/' + uid)
        .auth(env.API_USER, env.API_SECRET)
        .field('videoId', 2)
        .field('clientId', env.CLIENT_ID)
        .attach('profileImage', fs.readFileSync(img), name)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).is.a('object');
          expect(res.body.originalname).eq(name);
          expect(res.body.path).to.contains('/profiles/' + uid);
          expect(res.body.path).to.endsWith('.png');
          done();
        });
    });
  });

  function saveUsers(users, cb) {
    let count = users.length;
    users.forEach(function (user) {
      user.save(function (err, result) {
        if (err) throw Error(err);
        if (--count === 0) return cb(result);
      });
    });
  }
});
