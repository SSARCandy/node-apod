'use strict';

var iconv = require('iconv-lite');


function leftpad(str) {
    return ("0" + str).slice(-2);
}

var formatDate = function (str) {
    var date = new Date(str);
    if (!str) return '';
    if (!~str.indexOf('-')) return '';
    if (date.getFullYear() < 1996) return '';

    return `${date.getUTCFullYear()}-${leftpad(date.getUTCMonth() + 1)}-${leftpad(date.getUTCDate())}`;
}

function getCharset(str) {
    if (str == null) return null;
    var charset = str.match(/charset=["]*([^>"\s]+)/i);
    if (charset instanceof Array && charset.length >= 2) return charset[1];

    return null;
}

function decoder(buffer) {
    // try utf-8
    var decoded = iconv.decode(new Buffer(buffer), 'utf-8');
    var charset = getCharset(decoded);

    // re-do decode if charset != utf-8
    if (charset.toLowerCase() !== 'utf-8') {
        decoded = iconv.decode(new Buffer(buffer), charset);
    }

    return decoded;
}

module.exports = {
    formatDate: formatDate,
    getCharset: getCharset,
    decoder: decoder
};