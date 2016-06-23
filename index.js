var APOD_BASE_URL = "https://api.nasa.gov/planetary/apod";
var handleError = require('./handleError');
var i18n = require('./i18n/index');
var request = require('request');

var apod = function (API_KEY, LANG, callback) {
  if (!LANG) {
    LANG = 'en_us';
  }

  if (!i18n[LANG]) {
    callback('language not support!');
  }
  
  request(`${APOD_BASE_URL}?api_key=${API_KEY}`, function (error, response, body) {
    handleError(error, response, callback);

    body = JSON.parse(body);

    i18n[LANG](body, callback);
  });
};

module.exports = apod;
