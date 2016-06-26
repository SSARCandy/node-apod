'use strict';

const LANG = 'tr_tr';
const BASE_URL = 'http://www.bulutsu.org/ggg/';

const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function craw(baseData, callback) {
  let date = baseData.date.replace(/-/g, '').slice(2);
  request({
      url: `${BASE_URL}?gun=${date}`,
      encoding: null
    }, function(error, response, buf) {
      if (handleError(error, response)) {
        return callback(handleError(error, response));
      }

      let decoded = decoder(buf);

      let $ = cheerio.load(decoded);
      let title = $('body > table:nth-child(6) > tr:nth-child(1) > td > b:nth-child(1)').text().trim();
      let explanation = $('body > table:nth-child(6)  > tr:nth-child(2) > td').text().trim();

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
