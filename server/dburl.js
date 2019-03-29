require('dotenv').config();

let penv = process.env;

module.exports = 'mongodb://' + penv.DB_USER + ':' + penv.DB_PASS
  + '@' + penv.DB_HOST + ':' + penv.DB_PORT + '/' + penv.DB_NAME;
