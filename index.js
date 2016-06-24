var APOD_BASE_URL = "https://api.nasa.gov/planetary/apod";
var handleError = require('./handleError');
var utils = require('./utils');
var i18n = require('./i18n/index');
var request = require('request');



var apod = function(options, callback) {
  if (!options.API_KEY) {
    callback('API_KEY not defined!');
  }

  if (!options.LANG) {
    options.LANG = 'en_us';
  }

  if (!i18n[options.LANG]) {
    callback('Language not support!');
  }

  //FIXME
  options.DATE = utils.formatDate(options.DATE);

  request(`${APOD_BASE_URL}?api_key=${options.API_KEY}&date=${options.DATE}`, function (error, response, body) {
    handleError(error, response, callback);

    body = JSON.parse(body);

    i18n[options.LANG](body, callback);
  });
};


module.exports = apod;