'use strict';

const should = require('chai').should(); // eslint-disable-line
const expect = require('chai').expect; // eslint-disable-line
const APOD = require('../index');

function validateData(data) {
    data.should.have.property('title');
    data.should.have.property('date');
    data.should.have.property('explanation');
    data.should.have.property('media_type');
    data.should.have.property('url');
    data.should.have.property('service_version');
    data.should.have.property('lang');

    data.title.should.not.eql('');
    data.explanation.should.not.eql('');
}

describe('i18n', function() {
    const apod = new APOD(process.env.API_KEY);

    it('should success with en_us', function(done) {
        apod.get({
            DATE: '2016-05-11',
            LANG: 'en_us'
        }, function(err, data) {
            expect(err).to.be.null;
            validateData(data);
            done();
        });
    });

    it('should success with zh_tw', function(done) {
        apod.get({
            DATE: '2016-05-11',
            LANG: 'zh_tw'
        }, function(err, data) {
            expect(err).to.be.null;
            validateData(data);
            done();
        });
    });

    it('should success with fr_fr', function(done) {
        apod.get({
            DATE: '2016-05-11',
            LANG: 'fr_fr'
        }, function(err, data) {
            expect(err).to.be.null;
            validateData(data);
            done();
        });
    });

    it('should success with cs_cz', function(done) {
        apod.get({
            DATE: '2016-05-11',
            LANG: 'cs_cz'
        }, function(err, data) {
            expect(err).to.be.null;
            validateData(data);
            done();
        });
    });

});
