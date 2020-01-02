const fetch = require('node-fetch');
const DotEnv = require('dotenv');
const btoa = require('btoa');

fetch('http://localhost/spectre-pub/default-users.json')
  .then(res => res.json())
  .then(users => {

    console.log('[SCRIPT] ' + users.length + ' users loaded');

    let { route, auth, mode } = doConfig();

    route += 'batch';
    console.log('[POST] ' + mode + '.createBatch: ' + route);

    let onSuccess = inserts => {

      console.log('[RESULT] Inserted ' + inserts.length + ' records')

    }
    let onError = e => { console.error('[ERROR] ' + e.status + '/' + e.statusText + ': ' + e.error.errmsg) };

    fetch(route, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(users)
    })
      .then(handleResponse)
      .then(onSuccess)
      .catch(onError);

  }).catch(e => {
    console.error('[ERROR]', e);
  });

function doConfig() {

  // get auth from .env or heroku configs
  DotEnv.config({ path: '../client/.env' });

  const env = process.env;
  const route = '/api/users/';
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  const cid = env.REACT_APP_CLIENT_ID || -1;
  const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");

  return { auth: auth, route: host + route, clientId: cid, mode: mode };
}


function handleResponse(res) {
  return res.json().then((json) => {
    if (!res.ok) {
      //console.log("JSON", json);
      const error = Object.assign({}, json, {
        status: res.status,
        statusText: res.statusText,
      });
      return Promise.reject(error);
    }
    return json;
  });
}
