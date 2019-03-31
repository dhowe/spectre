let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let dburl = require('./dburl');
let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/spectre/api', require("./routes"));

app.get(['/', '/spectre','/spectre/api'], (req, res) => {
  res.json({
    status: 'API available',
    message: 'See /spectre/api',
  });
});

mongoose.connect(dburl, { useNewUrlParser: true });

app.listen(8083, function () {
  console.log("SPECTRE running on port 8083");
});
