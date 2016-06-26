'use strict';

const BASE_URL = 'http://www.astro.cz/apod';
const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function craw(baseData, callback) {
  let date = baseData.date.replace(/-/g, '').slice(2);

  request({
    url: `${BASE_URL}/ap${date}.html`,
    encoding: null
  }, function(error, response, buf) {
    if (handleError(error, response)) {
      return callback(handleError(error, response));
    }

    let decoded = decoder(buf);

    let $ = cheerio.load(decoded);
    let title = $('.apod > header > h1').text().trim();
    let explanation = $('article.apod > p').eq(1).text().trim().replace(/\r?\n/g, ' ');

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
