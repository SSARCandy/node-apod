'use strict';

const LANG = 'ja_jp';
const BASE_URL = 'http://home.u05.itscom.net/apodjpn/apodj';

const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function buildUrl(date) {
  let dateArray = date.split('-');
  return `${BASE_URL}/${dateArray[0]}/${dateArray[0]}${dateArray[1]}/jp${dateArray[0].slice(2)}${dateArray[1]}${dateArray[2]}.html`;
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
      let title = $('body > table  > tr:nth-child(2) > td:nth-child(2) ').text().trim();
      let explanation = $('body > center > p:nth-child(1)').text().trim();

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
