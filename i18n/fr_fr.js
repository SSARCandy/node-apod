'use strict';

const LANG = 'fr_fr';
const BASE_URL = 'http://www.cidehom.com/apod.php';

const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function craw(baseData, callback) {
  let date = baseData.date.replace(/-/g, '').slice(2);
  request({
      url: `${BASE_URL}?_date=${date}`,
      encoding: null
    }, function(error, response, buf) {
      if (handleError(error, response)) {
        return callback(handleError(error, response));
      }

      let decoded = decoder(buf);

      let $ = cheerio.load(decoded);
      let title = $('body > div > div:nth-child(6) > h1').text().trim();
      let explanation = $('body > div > div:nth-child(6) > div.article_colonne_gauche > div > p').text().trim().replace(/\r?\n/g, ' ');

      if (!title || !explanation) {
        return callback(notFoundError(baseData.date, LANG));
      }

      baseData.title = title;
      baseData.explanation = explanation;
      baseData.lang = LANG;
      return callback(null, baseData);
    });
}

module.exports = craw;
