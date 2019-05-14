import fs from 'fs';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
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

///////////////////////////// Express ///////////////////////////////

const app = express();
app.use('*', cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// minimal logging
app.all('*', morgan('[:date[clf]] :remote-addr :method :url :status', {
  skip: () => process.env.NODE_ENV === 'test'
}));

// static react files
app.use(express.static(path.join(__dirname, 'web-client/build')));

// for api routes
app.use(base, auth, routes);

// for react pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/web-client/build/index.html'));
});

//////////////////////////// Startup ////////////////////////////////

mongoose.connect(dbUrl, { useNewUrlParser: true });

export default app.listen(port, () => {
  console.log('Spectre API at localhost:' + port + base);
});
