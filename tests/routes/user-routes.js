import chai_http from 'chai-http';
import server from '../../server';
import fetch from 'node-fetch';
import dotEnv from 'dotenv';
import chai from 'chai';

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

describe('User Routes', () => {

  let refreshDb = done => {
    UserModel.deleteMany({}, (err) => {
      err && console.error('ERROR', err);
      fetch('http://localhost/spectre-pub/default-users.json')
        .then(res => res.json())
        .then(users => {
          chai.request(host)
            .post('/api/users/batch/')
            .auth(env.API_USER, env.API_SECRET)
            .send(users)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.length).eq(9);
              done();
            });
        });
    });
  };

  beforeEach(refreshDb);

  it('should fetch a single user', done => {
    let id = '888888888888888888888888';
    chai.request(host)
      .get('/api/users/' + id)
      .auth(env.API_USER, env.API_SECRET)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body._id).eq(id);
        done();
      });
  });

  it('should get similars for an existing user', done => {
    let id = '888888888888888888888888';
    let limit = 6;
    chai.request(host)
      .get('/api/users/similar/' + id + '?limit=' + limit)
      .auth(env.API_USER, env.API_SECRET)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        let similars = res.body;
        expect(similars.length).eq(6);
        expect(similars[0]).to.be.a('object');
        expect(similars[0]._id).to.be.a('string');
        done();
      });
  });

  it('should list all users', done => {
    chai.request(host)
      .get('/api/users/')
      .auth(env.API_USER, env.API_SECRET)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
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
        expect(res.body).to.be.a('object')
        expect(res.body._id).to.be.a('string');
        Object.assign(user, res.body);

        expect(user._id).to.be.a('string');
        chai.request(host)
          .get('/api/users/'+user._id)
          .auth(env.API_USER, env.API_SECRET)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body._id).eq(user._id);
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
        expect(res.body).to.be.a('object')
        expect(res.body._id).to.be.a('string');
        expect(res.body.similars.length).eq(0);
        Object.assign(user, res.body);

        //console.log(user);
        expect(user._id).to.be.a('string');
        expect(user.traits).to.be.undefined;
        //expect(user.traits.openness).to.be.undefined;

        chai.request(host)
          .put('/api/users/' + user._id)
          .auth(env.API_USER, env.API_SECRET)
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object')
            expect(res.body._id).to.be.a('string');
            expect(res.body.similars).to.be.a('array');
            expect(res.body.similars.length).eq(0);
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
        expect(res.body).to.be.a('object')
        expect(res.body._id).to.be.a('string');
        expect(res.body.similars.length).eq(0);
        Object.assign(user, res.body);

        //console.log(user);
        expect(user._id).to.be.a('string');
        user.traits = User._randomTraits();
        expect(user.traits).to.be.a('object');
        expect(user.traits.openness).to.be.gte(0);

        chai.request(host)
          .put('/api/users/' + user._id)
          .auth(env.API_USER, env.API_SECRET)
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object')
            expect(res.body._id).to.be.a('string');
            expect(res.body.similars).to.be.a('array');
            expect(res.body.similars.length).eq(6);
            done();
          });
      });
  });

  after(refreshDb);
});

  // function saveAll(records, cb) {
  //   let users = [];
  //   records.forEach(r => users.push(User._randomData(new UserModel(r))));
  //   let count = users.length;
  //   let result = [];
  //   users.forEach(user => {
  //     chai.request(host)
  //       .post('/api/users/')
  //       .auth(env.API_USER, env.API_SECRET)
  //       .send(user)
  //       .end((err, res) => {
  //         if (err) throw err;
  //         expect(res).to.have.status(200);
  //         Object.assign(user, res);
  //         result.push(user);
  //         if (--count === 0) return cb(result);
  //       });
  //   });
  // }
  //
  //   function updateAll(users, cb) {
  //
  //     let result = [];
  //     let count = users.length;
  //     users.forEach(user => {
  //       chai.request(host)
  //         .put('/api/users/' + user._id)
  //         .auth(env.API_USER, env.API_SECRET)
  //         .send(user)
  //         .end((err, res) => {
  //           expect(res).to.have.status(200);
  //           Object.assign(user, res.body);
  //           result.push(user);
  //           if (--count === 0) return cb(result);
  //         });
  //     });
  //   }
  //
  //   saveAll(defaults, function(users) {
  //     updateAll(users, function(results) {
  //       // let header = '// ------------------------------ This file was auto-';
  //       // header += 'generated ------------------------------\nlet users = [';
  //       fs.writeFileSync('auto_generated_users.json', JSON.stringify(results));
  //       done();
  //     });
  //   });
  // });
