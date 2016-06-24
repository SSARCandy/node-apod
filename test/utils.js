var utils = require('../utils');
var dateFixtures = require('./fixtures/dates');
var results = [];

function formatDateTest(fixture, answer) {
    var ans = utils.formatDate(fixture);
    console.log(ans == answer, ans);
    results.push(ans == answer);    
}

// invalid date 
formatDateTest(dateFixtures[0], '');

// yyyymmdd -> invalid date
formatDateTest(dateFixtures[1], '');

// yyyy-m-d -> yyyy-mm-dd
formatDateTest(dateFixtures[2], '2016-05-01');

// year < 1996 -> ''
formatDateTest(dateFixtures[0], '');







if (~results.indexOf(false)) {
    console.error('TEST FAILED: utils');
} else {
    console.log('TEST PASSED: utils');
}