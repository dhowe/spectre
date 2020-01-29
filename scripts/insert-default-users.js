const fetch = require('node-fetch');
const dotEnv = require('dotenv');
const btoa = require('btoa');
const users = require('./default-users');
const confirm = require('inquirer-confirm');

let { route, auth, mode } = doConfig();

if (typeof auth !== 'undefined') {
  console.log('[SCRIPT] ' + users.length + ' users loaded, Db is ' + mode);

  if (mode === 'PROD') {
    confirm({ question: 'Database is production. Confirm?' })
      .then(insertBatch, () => { });
  }
  else {
    insertBatch();
  }
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

  dotEnv.config({ path: '../client/.env' });

  const port = 8083;
  const env = process.env;
  const path = '/api/users/';
  const host = typeof window !== 'undefined'
    ? window.location.host.replace(/:[0-9]{4}$/, '') : 'localhost';
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  // use https if we're in production mode
  const proto = env.NODE_ENV !== 'production' ? 'http' : 'https';

  if (!env.REACT_APP_API_USER || !env.REACT_APP_API_SECRET) {
    console.error('\n[ERROR] Running client without authentication; Server/DB'
      + ' will not be available. Are you missing a .env file ?');
    return {};
  }

  const cid = env.REACT_APP_CLIENT_ID || -1;

  // Here we construct server host from window.location,
  // assuming server/db is on the same host as the web-app)
  const route = proto + '://' + host + ':' + port + path;

  //const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");
  //console.log('UserSession.route: '+route);
  return { auth: auth, route: route, clientId: cid, mode: mode };
}

function handleResponse(res) {
  return res.json().then(json =>
    res.status !== 200 ? Promise.reject(json) : json.data);
}
