'use strict';

const should = require('chai').should(); // eslint-disable-line
const APOD = require('../index');

describe('common error', function () {
    describe('API_KEY error', function () {
        it('should return error if no API_KEY', function () {
            const apod = new APOD('');
            apod.get({}, function (err, data) {
                err.should.eql('API_KEY not defined!');
            });
        });

        it('should return error with invalid API_KEY', function (done) {
            const apod = new APOD('invalidAPI_KEY');
            apod.get({}, function (err, data) {
                err.should.eql('response code not 200');
                done();
            });
        });
    });

    describe('LANG error', function () {
        const apod = new APOD(process.env.API_KEY);

        it('should return error with not support LANG', function () {
            let lang = 'kfkfkfk';
            apod.get({
                LANG: lang
            }, function (err, data) {
                err.should.eql(`Language ${lang} not support!`);
            });
        });
    });
});
