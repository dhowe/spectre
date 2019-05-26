import fs from 'fs';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
//import multer from 'multer';
import routes from './routes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { dbUrl, apiUser } from './config';

const base = '/api/';
const port = process.env.PORT || 8083;
const dev = process.env.NODE_ENV === 'test';

const auth = basicAuth({
  users: apiUser,
  challenge: true,
  realm: 'API User/Secret required'
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     //let fname = file.fieldname + '-' + Date.now();
//     //console.log('FILENAME: '+fname);
//     cb(null, file.fieldname + '-' + Date.now());
//     //cb(null, fname);
//   }
// });

//const upload = multer({ storage : storage}).single('userPhoto');

///////////////////////////// Express ///////////////////////////////

const app = express();
app.use('*', cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// minimal logging
app.all('*', morgan('[:date[clf]] :remote-addr :method :url :status', {
  skip: () => dev
}));

// static react files
app.use(express.static(path.join(__dirname, 'web-client/build')));

// for api routes`
app.use(base, auth, routes);

// for react pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/web-client/build/index.html'));
});

/////////////////////////// DbConnect ///////////////////////////////

const opts = { useNewUrlParser: true };
const dbu = dev ? dbUrl + '-dev' : dbUrl;
const dbn = dbu.substring(dbu.lastIndexOf('/') + 1);

mongoose.connect(dbu, opts);

//////////////////////////// Startup ////////////////////////////////

export default app.listen(port, () => {
  console.log('Spectre API at localhost:' + port + base + ' [' + dbn + ']\n');
});
// let server = app.listen(port, () => {
//   console.log('Spectre API at localhost:' + port + base + ' [' + dbn + ']\n');
// });
//
// server.storage = storage;
//
// export default server;
