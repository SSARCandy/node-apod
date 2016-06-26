var API_KEY = "WmtWE15aVRPb5XBcI7WEimtMyevbhKqNhJun8PgE";
var express = require('express');
var APOD    = require('node-apod');
var apod    = new APOD(API_KEY);
var app     = express();


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:lang/:date', function (req, res) {
  res.set({ 'content-type': 'application/json; charset=utf-8' })
  apod.get({
    LANG: req.params.lang,
    DATE: req.params.date || ''
  }, function(err, data) {
    //console.log()
    console.log(data)

    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
});

app.get('/:lang', function (req, res) {
  res.set({ 'content-type': 'application/json; charset=utf-8' })
  apod.get({
    LANG: req.params.lang,
  }, function(err, data) {
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