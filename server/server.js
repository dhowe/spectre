const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const basicAuth = require('express-basic-auth')
const { dbUrl, apiUser } = require('./config');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(basicAuth({
  users: apiUser,
  challenge: true,
  realm: 'SPECTRE'
  //unauthorizedResponse: getUnauthorizedResponse
}));

app.use('/spectre/', require("./routes"));

function getUnauthorizedResponse(req) {
  return req.auth ?
    ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
    'No credentials provided'
}

app.get(['/', '/spectre', ], (req, res) => {
  res.status(200).send('See /spectre/');
});

if (!require('fs').existsSync('.env')) {
  throw Error('Expected DB info in .env file');
}

mongoose.connect(dbUrl, { useNewUrlParser: true });

module.exports = app.listen(8083, function () {
  console.log("SPECTRE running on port 8083");
});
