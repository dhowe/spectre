require('dotenv').config();

let env = process.env;

module.exports = {
  dburl: 'mongodb://' + env.DB_USER + ':' + env.DB_PASS +
    '@' + env.DB_HOST + ':' + env.DB_PORT + '/' + env.DB_NAME
};
