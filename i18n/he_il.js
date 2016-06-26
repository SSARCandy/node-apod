'use strict';

const LANG = 'he_il';
const BASE_URL = 'http://www.astronomia2009.org.il/info/apod';

const handleError = require('../utils/handleError').common;
const notFoundError = require('../utils/handleError').notFound;
const request = require('request');
const cheerio = require('cheerio');
const decoder = require('../utils/utils').decoder;

function genFilepathByDate(date) {
    const monthMap = {
        '01': 'jan',
        '02': 'feb',
        '03': 'mar',
        '04': 'apr',
        '05': 'may',
        '06': 'jun',
        '07': 'jul',
        '08': 'aug',
        '09': 'sep',
        '10': 'oct',
        '11': 'nov',
        '12': 'dec'
    };

    let dateArr = date.split('-');
    let filepath = `${monthMap[dateArr[1]]}_${parseInt(dateArr[2], 10)}_${dateArr[0]}`;
    let filename = `apod-${monthMap[dateArr[1]]}${parseInt(dateArr[2], 10)}_${dateArr[0]}.htm`;
    return `${BASE_URL}/${filepath}/${filename}`;
}

function craw(baseData, callback) {
  let url = genFilepathByDate(baseData.date);
  console.log(url)
  request({
      url: url,
      encoding: null
    }, function(error, response, buf) {
      if (handleError(error, response)) {
        return callback(handleError(error, response));
      }

      let decoded = decoder(buf);

      let $ = cheerio.load(decoded);
      let title = $('#txt_0 > table:nth-child(9) > tbody > tr > td > p > b > font > span').eq(0).text().replace(/(<([^>]+)>)/ig,"").trim();
      let explanation = $('#txt_0 > table:nth-child(9) > tbody > tr > td > p > font').text().trim();
      console.log('ttttttttttt        '+title)
      console.log('eeeeeeeeeeeee' + explanation)

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
