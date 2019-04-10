require('dotenv').config();

let env = process.env;

let auth = '';
let apiu = env.API_USER;
let apip = env.API_PASS;
let apiUser = {};
apiUser[env.API_USER] = env.API_PASS;
let host = env.DB_HOST + ':' + env.DB_PORT + '/' + env.DB_NAME;
if (env.DB_USER && env.DB_USER.length) auth = env.DB_USER + ':' + env.DB_PASS + '@';

module.exports = {
  dbUrl: 'mongodb://' + auth + host,
  apiUser: apiUser
};
