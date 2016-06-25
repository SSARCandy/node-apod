'use strict';

var APOD_BASE_URL = "https://api.nasa.gov/planetary/apod";
var handleError = require('./handleError').common;
var utils = require('./utils');
var i18n = require('./i18n/index');
var request = require('request');

function APOD(API_KEY) {
  this.API_KEY = API_KEY;
}

APOD.prototype.get = function(options, callback) {
  if (!this.API_KEY) {
    return callback('API_KEY not defined!');
  }

  if (!options.LANG) {
    options.LANG = 'en_us';
  }

  if (!i18n[options.LANG]) {
    return callback(`Language ${options.LANG} not support!`);
  }

  //FIXME
  options.DATE = utils.formatDate(options.DATE);

  var opt = {
    url: `${APOD_BASE_URL}?api_key=${this.API_KEY}&date=${options.DATE}`,
    json: true
  };

  request(opt, function (error, response, body) {
    if (handleError(error, response, body)) {
      return callback(handleError(error, response, body));
    }

    i18n[options.LANG](body, callback);
  });
};


module.exports = APOD;