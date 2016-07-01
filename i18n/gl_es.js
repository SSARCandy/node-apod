'use strict';

const LANG = 'gl_es';
const BASE_URL = 'http://astrogalicia.org/apod';

const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function buildUrl(date) {
  let dateArray = date.split('-');
  return `${BASE_URL}/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
}

function craw(baseData, callback) {
  let url = buildUrl(baseData.date);

  request({
      url: url,
      encoding: null
    }, function(error, response, buf) {
      if (handleError(error, response)) {
        return callback(handleError(error, response));
      }

      let decoded = decoder(buf);

      let $ = cheerio.load(decoded);
      let title = $('article > header > h1 > a').text().trim();
      let explanation = $('article > div').text();
      let expIdx = explanation.indexOf('Exp');
      explanation = explanation.slice(expIdx);

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
