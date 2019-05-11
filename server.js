import fs from 'fs';
import path from 'path';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { dbUrl, apiUser } from './config';

const base = '/api/';
const port = process.env.PORT || 8083;
const auth = basicAuth({
  users: apiUser,
  challenge: true,
  realm: 'API User/Secret required'
});

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

///////////////////////////// Express ///////////////////////////////

const app = express();
app.use(allowCrossDomain);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// static react files
app.use(express.static(path.join(__dirname, 'api-test/build')));

// for api routes
app.use(base, auth, routes);

// for react pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/api-test/build/index.html'));
});

//////////////////////////// Startup ////////////////////////////////

// if (!fs.existsSync('.env')) {
//   throw Error('Expected DB/API info in .env');
// }

mongoose.connect(dbUrl, { useNewUrlParser: true });

export default app.listen(port, () => {
  console.log('Spectre API at localhost:' + port + base);
});
