import chai_http from 'chai-http';
import server from '../../server';
import dotEnv from 'dotenv';
import fetch from 'node-fetch';
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

const defaultsIds = [
  "111111111111111111111111",
  "333333333333333333333333",
  "222222222222222222222222",
  "444444444444444444444444",
  "666666666666666666666666",
  "555555555555555555555555",
  "888888888888888888888888",
  "777777777777777777777777",
  "999999999999999999999999"
];

describe('User Routes', () => {

  let refreshDb = (done) => {
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
  }

  beforeEach(refreshDb);

  it('should list all users', (done) => {
    let id = '888888888888888888888888';
    chai.request(host)
      .get('/api/users/'+id)
      .auth(env.API_USER, env.API_SECRET)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object')
        expect(res.body._id).eq(id);
        done();
      });
  });

  it('should fetch a single user', (done) => {
    chai.request(host)
      .get('/api/users/')
      .auth(env.API_USER, env.API_SECRET)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array')
        done();
      });
  });

  it('should fetch users from model', (done) => {
    UserModel.getAll((err, users) => {
      expect(err).to.be.null;
      expect(users.length).eq(9);
      done();
    });
  });



  after(refreshDb);
});
  // it('should generate a set of default users', (done) => {
  // //describe('User Generator', () => {
  // it('should generate a set of default users', (done) => {
  //   const defaults = [
  //     {
  //       _id: '111111111111111111111111',
  //       login: 'remy@mail.com',
  //       loginType: 'email',
  //       name: 'Remy',
  //       gender: 'male'
  //     },
  //     {
  //       _id: '222222222222222222222222',
  //       login: 'bailey@mail.com',
  //       loginType: 'email',
  //       name: 'Bailey',
  //       gender: 'male'
  //     },
  //     {
  //       _id: '333333333333333333333333',
  //       login: 'devin@mail.com',
  //       loginType: 'email',
  //       name: 'Devin',
  //       gender: 'female'
  //     },
  //     {
  //       _id: '444444444444444444444444',
  //       login: 'tyler@mail.com',
  //       loginType: 'email',
  //       name: 'Tyler',
  //       gender: 'male'
  //     },
  //     {
  //       _id: '555555555555555555555555',
  //       login: 'fran@mail.com',
  //       loginType: 'email',
  //       name: 'Fran',
  //       gender: 'female'
  //     },
  //     {
  //       _id: '666666666666666666666666',
  //       login: 'bernard@mail.com',
  //       loginType: 'email',
  //       name: 'Bernard',
  //       gender: 'male'
  //     },
  //     {
  //       _id: '777777777777777777777777',
  //       login: 'sing@mail.com',
  //       loginType: 'email',
  //       name: 'Sing',
  //       gender: 'male'
  //     },
  //     {
  //       _id: '888888888888888888888888',
  //       login: 'sally@mail.com',
  //       loginType: 'email',
  //       name: 'sally',
  //       gender: 'female'
  //     },
  //     {
  //       _id: '999999999999999999999999',
  //       login: 'dick@mail.com',
  //       loginType: 'email',
  //       name: 'Dick',
  //       gender: 'male'
  //     }
  //   ];
  //
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
  // //  });
