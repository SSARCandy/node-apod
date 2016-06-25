var utils = require('../utils/utils');
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

// yyyy-mm-dd
formatDateTest(dateFixtures[3], '1994-03-26');

// --- -> invalid date
formatDateTest(dateFixtures[4], '');

// /// -> invalid date
formatDateTest(dateFixtures[5], '');

// yyyy/mm/dd -> invalid date
formatDateTest(dateFixtures[6], '1994-03-26');



if (~results.indexOf(false)) {
    console.error('TEST FAILED: utils');
} else {
    console.log('TEST PASSED: utils');
}