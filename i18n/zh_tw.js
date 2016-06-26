'use strict';

const BASE_URL = 'http://www.phys.ncku.edu.tw/~astrolab/mirrors/apod';
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
      let title = $('body').children('center').eq(1).text().trim().split(/\r?\n/)[0];
      let explanation = $('body').children('p').eq(0).text().trim();

      if (!title || !explanation) {
        return callback(notFoundError(baseData.date, 'zh_tw'));
      }

      baseData.title = title;
      baseData.explanation = explanation;
      baseData.lang = 'zh_tw';
      return callback(null, baseData);
    });
}

module.exports = craw;
