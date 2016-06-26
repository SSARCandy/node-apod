'use strict';

const LANG = 'de_de';
const BASE_URL = 'http://www.starobserver.org';

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
      let title = $('body > center > h3').text().trim();
      let explanation = $('body > center > p:nth-child(6)').text().trim();

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
