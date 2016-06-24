var BASE_URL = "http://www.phys.ncku.edu.tw/~astrolab/mirrors/apod";
var handleError = require('../handleError');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function (baseData, callback) {
    /**
     * date format: yymmdd
     * example:     160517
     */

    var date = baseData.date.replace(/-/g, '').slice(2);
    request(`${BASE_URL}/ap${date}.html`, function (error, response, html) {
        handleError(error, response, callback);
        
        var $ = cheerio.load(html);
        var title = $('body').children('center').eq(1).text().trim().split(/\r?\n/)[0];
        var explanation = $('body').children('p').eq(0).text().trim();
        baseData.title = title;
        baseData.explanation = explanation;

        callback(null, baseData);
    });
};