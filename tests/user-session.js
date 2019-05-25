import server from '../server';
import dotEnv from 'dotenv';
import chai from 'chai';

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

  let postImages = function (onSuccess, onError) {

    let route = '/api/post/images/';
    let auth = {};
    auth[env.API_USER] = env.API_SECRET;
    if (!onSuccess) onSuccess = () => {};
    if (!onError) onError = () => {};
    console.log('POST(Images): ' + route);
    return 1;
  }

  describe('Images: POST /api/images', () => {

    it('it should post a set of images', (done) => {

      let result = postImages();
      expect(result).eq(1);
      done();
        /*fetch(route, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Basic ' + btoa(auth)
            },
            body: JSON.stringify(images)
          })
          .then(handleResponse.bind(this))
          .then(onSuccess.bind(this))
          .catch(onError.bind(this));*/
    });
  });
});
