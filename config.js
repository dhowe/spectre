import dotEnv from 'dotenv';

dotEnv.config();

let auth = '';
let env = process.env;
let host = env.DB_HOST + ':' + env.DB_PORT + '/' + env.DB_NAME;
if (env.DB_USER && env.DB_USER.length) auth = env.DB_USER + ':' + env.DB_PASS + '@';

let apiUser = {};
apiUser[env.API_USER] = env.API_PASS;

let dbUrl = process.env.MONGODB_URI || 'mongodb://' + auth + host;

export { dbUrl, apiUser };
