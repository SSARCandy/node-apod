'use strict';

var BASE_URL = "http://www.phys.ncku.edu.tw/~astrolab/mirrors/apod";
var handleError = require('../handleError').common;
var notFoundError = require('../handleError').notFound;

var request = require('request');
var cheerio = require('cheerio');
var decoder = require('../utils').decoder;


/**
 * date format: yymmdd
 * example:   ap160517.html
 */
module.exports = function (baseData, callback) {
    var date = baseData.date.replace(/-/g, '').slice(2);
    request({
        url: `${BASE_URL}/ap${date}.html`,
        encoding: null
    }, function (error, response, buf) {
        if (handleError(error, response)) {
            return callback(handleError(error, response));
        }

        var decoded = decoder(buf);

        var $ = cheerio.load(decoded);
        var title = $('body').children('center').eq(1).text().trim().split(/\r?\n/)[0];
        var explanation = $('body').children('p').eq(0).text().trim();

        if (!title || !explanation) {
            return callback(notFoundError(baseData.date, 'zh_tw'));
        } else {
            baseData.title = title;
            baseData.explanation = explanation;
            return callback(null, baseData);
        }
    });
};