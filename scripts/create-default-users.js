/*
 * Usage: node -r esm create-default-users.js
 */
import btoa from 'btoa';
import dotEnv from 'dotenv';
import fetch from 'node-fetch';
import iconfirm from 'inquirer-confirm';
import users from '../client/src/Components/UserSession/default-users';

const { route, auth, mode } = doConfig();

console.log('[SCRIPT] ' + users.length + ' users loaded, Db is ' + mode, route);

if (mode === 'PROD') {
  iconfirm({ question: 'Database is production. Confirm?' })
    .then(insertDefaultUsers, () => { });
}
else {
  insertDefaultUsers();
}

async function insertDefaultUsers() {

  console.log('[POST] insertDefaults: ' + route);
  const [json, e] = await safeFetch(route, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(auth)
    },
    body: JSON.stringify(users)
  });

  if (e) throw e;

  console.log(json);
}

function doConfig() {

  dotEnv.config();

  if (!process.env.API_USER || !process.env.API_SECRET) {
    throw Error('Running client without authentication; Server/DB'
      + ' will not be available. Are you missing a .env file ?');
  }

  const port = 8083;
  const env = process.env;
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';
  const auth = env.API_USER + ':' + env.API_SECRET;
  const proto = env.NODE_ENV !== 'production' ? 'http' : 'https';
  const route = proto + '://localhost:' + port + '/api/users/batch/';

  return { route, auth, mode };
}

async function safeFetch() {
  return fetch(...arguments)
    .then(resp => {
      console.log('safeFetch1.resp',resp);
      return resp ? resp.json() :
        Promise.resolve([undefined, 'no-response'])
    })
    .then(json => {
      //console.log('safeFetch2.json',json);
      if (!json) return Promise.resolve([undefined, 'no-json-data'])
      if (json.status !== 200) {
        return Promise.resolve([undefined, json.status + '/' + (json.message || 'no-message')])
      }
      return [json.data, undefined];
    })
    .catch(error => Promise.resolve([undefined, error]));
}
