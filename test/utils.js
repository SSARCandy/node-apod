'use strict';

const should = require('chai').should(); // eslint-disable-line
const utils = require('../utils/utils');

describe('utils', function() {
    describe('format date', function() {
        const formatDate = utils.formatDate;

        it('should passed normal format yyyy-mm-dd', function() {
            formatDate('2016-03-26').should.eql('2016-03-26');
          });

        it('should returns empty string with invalid date', function() {
            formatDate('gtfttr').should.eql('');
            formatDate('20110511').should.eql('');
            formatDate('---').should.eql('');
            formatDate('///').should.eql('');
          });

        it('should format yyyy/mm/dd to yyyy-mm-dd', function() {
            formatDate('1994/03/26').should.eql('1994-03-26');
          });

        it('should format yyyy-m-d to yyyy-mm-dd', function() {
            formatDate('1994-3-26').should.eql('1994-03-26');
          });

        it('should format yyyy/m/d to yyyy-mm-dd', function() {
            formatDate('1994/3/2').should.eql('1994-03-02');
          });
      });
  });
