let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let dburl = require('./config').dburl;
let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/spectre/api', require("./routes"));

app.get(['/', '/spectre', '/spectre/api'], (req, res) => {
  res.status(200).send('See /spectre/api');
});

if (!require('fs').existsSync('.env')) {
  throw Error('Expected DB info in .env file');
}

mongoose.connect(dburl, { useNewUrlParser: true });

module.exports = app.listen(8083, function () {
  console.log("SPECTRE running on port 8083");
});
