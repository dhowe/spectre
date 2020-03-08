import dotEnv from 'dotenv';
import path from 'path';

dotEnv.config();

let env = process.env;
let prod = env.NODE_ENV === 'production';

let portDb = env.DB_PORT || 27017;
let hostDb = env.DB_HOST || 'localhost';
let nameDb = env.DB_NAME || 'spectre';

let dbauth = '';
let dbhost = hostDb + ':' + portDb + '/' + nameDb;

let apiUser = {};
apiUser[env.API_USER] = env.API_SECRET;

if (env.DB_USER && env.DB_USER.length) {
  dbauth = env.DB_USER + ':' + env.DB_PASS + '@';
}

let secret = env.JWT_SECRET;
let certs = env.CERT_PATH || 'unknown';
let dbUrl = env.SPECTRE_DBURI || 'mongodb://' + dbauth + dbhost;

let clientDir = path.join(__dirname, '/client');
let profDir = prod ? '/Library/WebServer/Documents/spectre/profiles'
  : clientDir + '/public/profiles';

export { dbUrl, apiUser, certs, profDir, prod, clientDir, secret };
