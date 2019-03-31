let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let dburl = require('./dburl');
let app = express();

app.get(['/', '/spectre','/spectre/api'], info);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect(dburl, { useNewUrlParser: true });

app.use('/spectre/api', require("./routes"));

app.listen(8083, function () {
  console.log("SPECTRE running on port 8083");
});

function info(req, res) {
  res.json({
    status: 'API available',
    message: 'See /spectre/api',
  });
}
