import fs from 'fs';
import cors from 'cors';
import http from 'http';
import https from 'https';
import express from 'express';
import logger from './logger';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';

import UserModel from './user-model';

import { dbUrl, apiUser, profDir, clientDir, certs, prod } from './config';

const base = '/api/';
const port = process.env.PORT || 8083;
const test = process.env.NODE_ENV === 'test';

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
if (!prod) app.use(express.static(clientDir + '/build'));

// for other api routes (w-auth)
app.use(base, auth, routes);

// for react pages in dev (no-auth)
const index = clientDir + '/build/index.html';
if (!prod) app.get('*', (req, res) => res.sendFile(index));

 // watch for new profile images to process
if (!test) import('./profile-maker').then(ProfileMaker => {
   new (ProfileMaker.default)().watch(profDir);
});

/////////////////////////// DbConnect ///////////////////////////////

const dbstr = prod ? dbUrl : dbUrl + '-dev';
(async () => {
  try {
    await mongoose.connect(dbstr, {
      poolSize: 8,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    mongoose.connection.on('error', console.error);
  } catch (e) {
    console.error('\n[DB] ' + e.name + '...');
    console.error('[DB] Unable to connect to ' + dbstr + '\n');
    UserModel.databaseDisabled = true;
  }
})();

let server, logf = (dev) => {
  console.log('\nSpectre API at ' + (dev ? 'http' : 'https:') + '//localhost:'
    + port + base + ' [' + dbstr.substring(dbstr.lastIndexOf('/') + 1)
    + '::' + profDir + ']');
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
    console.error('\n[ERROR] Unable to start HTTPS, trying HTTP\n', e, '\n');
  }
}

if (!server) server = http.createServer(app).listen(test ? 8094 : port, () => logf(true));

export default server;
