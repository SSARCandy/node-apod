var apod = require('../index');
var API_KEY = process.env.API_KEY;

apod({
    API_KEY: API_KEY,
    LANG: "zh_tw",
    DATE: '2016-05-11'
}, function(err, data) {
    console.log(data);
});