import fs from 'fs';
import path from 'path';
import cors from 'cors';
import http from 'http';
import https from 'https';
import express from 'express';
import logger from './logger';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';
import controller from './user-controller';
import { dbUrl, apiUser, certs } from './config';

import ProfileMaker from './profile-maker';
import UserModel from './user-model';

const base = '/api/';
const port = process.env.PORT || 8083;
const test = process.env.NODE_ENV === 'test';
const prod = process.env.NODE_ENV === 'production';
const client = path.join(__dirname, '/client');

if (!apiUser[process.env.API_USER]) {
  throw Error('Attempt to start server without ' +
    'authentication; are you missing a .env file?');
}

const auth = basicAuth({
  users: apiUser,
  challenge: true,
  realm: 'API User/Secret required'
});

///////////////////////////// Express ///////////////////////////////

const app = express();
app.use('*', cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// minimal logging
app.all('*', logger('[:date[clf]] :remote-addr :method :url :status', {
  skip: () => test
}));

// static react files (no-auth)
if (!prod) app.use(express.static(client + '/build'));

// current user route (no-auth)
app.get(base + 'users/current/:cid', controller.current);

// for other api routes (w-auth)
app.use(base, auth, routes);

// for react pages in dev (no-auth)
if (!prod) app.get('*', (req, res) => res.sendFile(client + '/build/index.html'));

// watch for new profile images to process
const profiles = prod ? '/profiles' : client + '/public/profiles'
if (!test) new ProfileMaker().watch(profiles);

/////////////////////////// DbConnect ///////////////////////////////

const opts = { useNewUrlParser: true, useFindAndModify: false };
const dbstr = prod ? dbUrl : dbUrl + '-dev';

(async () => {

  try {
    await mongoose.connect(dbstr, opts);
    mongoose.connection.on('error', console.error);
    UserModel.databaseDisabled = false;
  } catch (e) {
    console.error('\n[DB] ' + e.name + '...');
    console.error('[DB] Unable to connect to ' + dbstr + '\n');
    UserModel.databaseDisabled = true;
  }
})();

// while (!dbConnect()) {
//   setInterval(() => {
//     console.log('[WARN] Retrying Db @ '+(+new Date()));
//   }, 5000);
// }

let server, logf = () => {
  console.log('\nSpectre API at http://localhost:' + port + base
    + ' [' + dbstr.substring(dbstr.lastIndexOf('/') + 1)
    + ']\n  profiles: '+profiles);
}

if (prod) { // load ssl certs for production
  try {
    const ca = fs.readFileSync(certs + 'cert.pem', 'utf8');
    const key = fs.readFileSync(certs + 'privkey.pem', 'utf8');
    const cert = fs.readFileSync(certs + 'fullchain.pem', 'utf8');
    const credentials = { key: key, cert: cert, ca: ca };
    server = https.createServer(credentials, app).listen(port, logf);
  }
  catch (e) {
    console.error('\n[ERROR] Unable to start HTTPS, trying HTTP\n',e,'\n');
  }
}

if (!server) server = http.createServer(app).listen(port, logf);

export default server;
