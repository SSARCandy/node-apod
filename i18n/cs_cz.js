var BASE_URL = "http://www.astro.cz/apod";
var handleError = require('../handleError');
var request = require('request');
var cheerio = require('cheerio');


/**
 * date format: yymmdd
 * example:   ap160517.html
 */
module.exports = function (baseData, callback) {
    var date = baseData.date.replace(/-/g, '').slice(2);
    request(`${BASE_URL}/ap${date}.html`, function (error, response, html) {
        handleError(error, response, callback);

        var $ = cheerio.load(html);
        var title = $('.apod>header>h1').text().trim();
        var explanation = $("article.apod>p").eq(1).text().trim().replace(/\r?\n/g, ' ');

        baseData.title = title;
        baseData.explanation = explanation;

        callback(null, baseData);
    });
};