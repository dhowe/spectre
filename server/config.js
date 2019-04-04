require('dotenv').config();

let env = process.env;

let auth = '';
let host = env.DB_HOST + ':' + env.DB_PORT + '/' + env.DB_NAME;
if (env.DB_USER && env.DB_USER.length) env.DB_USER += ':' + env.DB_PASS + '@';

module.exports = { dburl: 'mongodb://' + auth + host };
