import fs from 'fs';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { dbUrl, apiUser } from './config';

let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(basicAuth({
  users: apiUser,
  challenge: true,
  realm: 'SPECTRE'
  //unauthorizedResponse: getUnauthorizedResponse
}));

app.use('/spectre/', routes);

function getUnauthorizedResponse(req) {
  return req.auth ?
    ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
    'No credentials provided'
}

app.get(['/', '/spectre', ], (req, res) => {
  res.status(200).send('See /spectre/');
});

if (!fs.existsSync('.env')) {
  throw Error('Expected DB info in .env file');
}

mongoose.connect(dbUrl, { useNewUrlParser: true });

export default app.listen(8083, function () {
  console.log("SPECTRE running on port 8083");
});
