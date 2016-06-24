var BASE_URL = "http://www.astro.cz/apod";
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
        handleError(error, response, callback);
        var decoded = decoder(buf);

        var $ = cheerio.load(decoded);
        var title = $('.apod>header>h1').text().trim();
        var explanation = $("article.apod>p").eq(1).text().trim().replace(/\r?\n/g, ' ');

        if (!title || !explanation) {
            callback(notFoundError(baseData.date, 'cs_cz'));
        } else {
            baseData.title = title;
            baseData.explanation = explanation;
            callback(null, baseData);
        }
    });
};