import path from 'path';
import cors from 'cors';
import express from 'express';
import logger from './logger';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { dbUrl, apiUser } from './config';
import controller from './user-controller';
import profileMaker from './profile-maker';

const base = '/api/';
const port = process.env.PORT || 8083;
const test = process.env.NODE_ENV === 'test';
const dev = process.env.NODE_ENV !== 'production';
const client = path.join(__dirname, '/client');

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
app.use(express.static(client + '/build'));

// current user route (no-auth)
app.get(base + 'users/current/:cid', controller.current);

// for other api routes (w-auth)
app.use(base, auth, routes);

// for all react pages (no-auth)
app.get('*', (req, res) => {
  res.sendFile(client + '/build/index.html');
});

test || profileMaker.watch(client + '/public/profiles');

/////////////////////////// DbConnect ///////////////////////////////

const opts = { useNewUrlParser: true, useFindAndModify: false };
const dbstr = dev ? dbUrl + '-dev' : dbUrl;

(async () => {
  try {
    await mongoose.connect(dbstr, opts);
    mongoose.connection.on('error', console.error);
  } catch (error) {
    console.error('\n[DB] ' + e.name + '...');
    console.error('[DB] Unable to connect to ' + dbstr + '\n')
  }
})();

export default app.listen(port, () => {
  console.log('Spectre API at localhost:' + port + base +
    ' [' + dbstr.substring(dbstr.lastIndexOf('/') + 1) + ']\n');
});




//////////////////////////// Startup ////////////////////////////////
