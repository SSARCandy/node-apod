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
  apod(API_KEY, req.params.lang, function(err, data) {
    //console.log()
    res.json(data);
  })
});

app.listen(2048, function () {
  console.log('node-apod demo app listening on port 2048!');
});