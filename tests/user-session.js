import server from '../server';
import dotEnv from 'dotenv';
import chai from 'chai';
import FormData from 'form-data';

const env = process.env;
const expect = chai.expect;
const port = env.PORT || 8083;

describe('User Session', () => {

  dotEnv.config();

  let UserSession = {};
  let host = 'localhost:' + port;
  if (typeof env.API_HOST !== 'undefined') {
    host = env.API_HOST + ':' + port;
  }

  let handleResponse = (res) => {
    return res.json()
      .then((json) => {
        if (!res.ok) {
          const error = Object.assign({}, json, {
            status: res.status,
            statusText: res.statusText,
          });
          return Promise.reject(error);
        }
        return json;
      });
  }

  let postImage = function (file, onSuccess, onError) {

    if (typeof file === 'undefined') throw Error('no file');
    if (typeof env.CLIENT_ID === 'undefined') throw Error('no cid');

    let route = '/api/users/photo';

    let auth = {};
    auth[env.API_USER] = env.API_SECRET;

    if (!onSuccess) onSuccess = () => {};
    if (!onError) onError = () => {};

    console.log('POST(Images): ' + route);

    let data = new FormData();
    data.append('file', file);
    data.append('clientId', env.CLIENT_ID);
    // for (let f of files) {
    //   data.append('file', file);
    // }

    if (0) {
      fetch(route, {
          method: "post",
          headers: {
            //"Content-Type": "application/json",
            "Authorization": 'Basic ' + btoa(auth)
          },
          body: data
        })
        .then(handleResponse.bind(this))
        .then(onSuccess.bind(this))
      .catch(onError.bind(this));
    }
  };

  describe('Images: POST /api/users/photo', () => {

    it('it should post a set of images', (done) => {
      let file = '../web-client/public/targets/target4.png';
      let result = postImage(file, () => {
        console.log("DONE");
        expect(result).eq(1);
      }, e => {
        throw e;
      });
      done();
    });
  });
});
