import fs from 'fs';
import path from 'path';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { dbUrl, apiUser } from './config';

if (!fs.existsSync('.env')) {
  throw Error('Expected DB info in .env file');
}

const app = express();
const port = process.env.PORT || 8083;
const auth = basicAuth({
  users: apiUser,
  challenge: true,
  realm: 'Spectre'
  //unauthorizedResponse: onUnauthorized
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// static react files
app.use(express.static(path.join(__dirname, 'api-test/build')));

// for api routes
app.use('/api/', auth, routes);

// for react pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/api-test/build/index.html'));
});

function onUnauthorized(req) {
  return req.auth ?
    ('Credentials ' + req.auth.user + ':' +
      req.auth.password + ' rejected') : 'No credentials provided'
}

mongoose.connect(dbUrl, { useNewUrlParser: true });

export default app.listen(port, () => {
  console.log("Spectre API on port " + port);
});
