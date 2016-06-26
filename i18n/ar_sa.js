'use strict';

const BASE_URL = 'http://www.apodar.com/apod';
const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function craw(baseData, callback) {
  let date = baseData.date;

  request({
    url: `${BASE_URL}/${date}/`,
    encoding: null
  }, function(error, response, buf) {
    if (handleError(error, response)) {
      return callback(handleError(error, response));
    }

    let decoded = decoder(buf);

    let $ = cheerio.load(decoded);
    let title = $('div.ap-desc > div:nth-child(1) > div.large-10.medium-9.small-8.columns > div').text().trim();
    let explanation = $('body > div.region4 > div:nth-child(1) > div > div').text().trim();

    if (!title || !explanation) {
      return callback(notFoundError(baseData.date, 'cs_cz'));
    }

    baseData.title = title;
    baseData.explanation = explanation;
    baseData.lang = 'ar_sa';
    callback(null, baseData);
  });
}

module.exports = craw;
