var express = require('express');
var apod    = require('node-apod');
var app     = express();

var API_KEY = "WmtWE15aVRPb5XBcI7WEimtMyevbhKqNhJun8PgE";

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:lang', function (req, res) {
  apod({
    API_KEY: API_KEY, 
    LANG: req.params.lang,
  }, function(err, data) {
    //console.log()
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
});

app.get('/:lang/:date', function (req, res) {
  apod({
    API_KEY: API_KEY, 
    LANG: req.params.lang,
    DATE: req.params.date || ''
  }, function(err, data) {
    //console.log()
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
});

app.listen(2048, function () {
  console.log('node-apod demo app listening on port 2048!');
});