const fetch = require('node-fetch');
const dotEnv = require('dotenv');
const btoa = require('btoa');
const users = require('./default-users');
const confirm = require('inquirer-confirm');

let { route, auth, mode } = doConfig();

console.log('[SCRIPT] ' + users.length + ' users loaded', mode);

if (mode === 'PROD') {
  confirm({ question: 'Database is production. Confirm?' })
    .then(insertBatch, () => { });
}
else {
  insertBatch();
}

function insertBatch() {

  route += 'batch';
  console.log('[POST] ' + mode + '.createBatch: ' + route);

  fetch(route, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: JSON.stringify(users)
  })
    .then(handleResponse)
    .then(data => console.log('[RESULT] Inserted ' + data.length + ' records'))
    .catch(e => console.error('[ERROR] ' + e.status + '/' + e.message));
}

function doConfig() {

  // get auth from .env or heroku configs
  dotEnv.config({ path: '../client/.env' });

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
  return res.json().then(json =>
    res.status !== 200 ? Promise.reject(json) : json.data);
}
