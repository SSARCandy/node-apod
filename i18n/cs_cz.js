'use strict';

var BASE_URL = 'http://www.astro.cz/apod';
var handleError = require('../utils/handleError').common;
var notFoundError = require('../utils/handleError').notFound;
var request = require('request');
var cheerio = require('cheerio');
var decoder = require('../utils/utils').decoder;

function craw(baseData, callback) {
  var date = baseData.date.replace(/-/g, '').slice(2);

  request({
    url: `${BASE_URL}/ap${date}.html`,
    encoding: null
  }, function(error, response, buf) {
    if (handleError(error, response)) {
      return callback(handleError(error, response));
    }

    var decoded = decoder(buf);

    var $ = cheerio.load(decoded);
    var title = $('.apod > header > h1').text().trim();
    var explanation = $('article.apod > p').eq(1).text().trim().replace(/\r?\n/g, ' ');

    if (!title || !explanation) {
      return callback(notFoundError(baseData.date, 'cs_cz'));
    }

    baseData.title = title;
    baseData.explanation = explanation;
    baseData.lang = 'cs_cz';
    callback(null, baseData);
  });
}

module.exports = craw;
