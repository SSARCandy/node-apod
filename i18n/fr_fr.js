'use strict';

var BASE_URL = "http://www.cidehom.com/apod.php";
var handleError = require('../handleError').common;
var notFoundError = require('../handleError').notFound;

var request = require('request');
var cheerio = require('cheerio');
var decoder = require('../utils').decoder;


/**
 * date format: yymmdd
 * example:   ?date=160517
 */
module.exports = function (baseData, callback) {
    var date = baseData.date.replace(/-/g, '').slice(2);
    request({
        url: `${BASE_URL}?_date=${date}`,
        encoding: null
    }, function (error, response, buf) {
        if (handleError(error, response)) {
            return callback(handleError(error, response));
        }

        var decoded = decoder(buf);

        var $ = cheerio.load(decoded);
        var title = $('body > div > div:nth-child(6) > h1').text().trim();
        var explanation = $("body > div > div:nth-child(6) > div.article_colonne_gauche > div > p").text().trim().replace(/\r?\n/g, ' ');

        if (!title || !explanation) {
            return callback(notFoundError(baseData.date, 'fr_fr'))
        } else {
            baseData.title = title;
            baseData.explanation = explanation;
            return callback(null, baseData);
        }
    });
};