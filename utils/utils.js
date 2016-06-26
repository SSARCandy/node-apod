'use strict';

const iconv = require('iconv-lite');

function leftpad(str) {
  return ('0' + str).slice(-2);
}

function checkDateArray(date) {
  date = date.map(parseFloat);
  if (!date[0] || !date[1] || !date[2]) return false;
  if (date[0].length < 4) return false;
  if (date[1] > 12 || date[1] < 1) return false;
  if (date[2] > 31 || date[2] < 1) return false;

  return true;
}

function formatDate(str) {
  if (!str) return '';

  // yyyy-%m-%d
  if (str.split('-').length === 3) {
    let date = str.split('-');
    return checkDateArray(date) ? `${date[0]}-${leftpad(date[1])}-${leftpad(date[2])}` : '';
  }

  // yyyy/%m/%d
  if (str.split('/').length === 3) {
    let date = str.split('/');
    return checkDateArray(date) ? `${date[0]}-${leftpad(date[1])}-${leftpad(date[2])}` : '';
  }

  // yyyymmdd
  if (str.length === 8 && parseInt(str, 10)) {
    let date = [str.slice(0, 4), str.slice(4, 6), str.slice(6)];
    return checkDateArray(date) ? `${date[0]}-${leftpad(date[1])}-${leftpad(date[2])}` : '';
  }

  return '';
}

function getCharset(str) {
  if (str == null) return null;
  let charset = str.match(/charset=["]*([^>"\s]+)/i);
  if (charset instanceof Array && charset.length >= 2) return charset[1];

  return null;
}

function decoder(buffer) {
  // try utf-8
  let decoded = iconv.decode(new Buffer(buffer), 'utf-8');
  let charset = getCharset(decoded);

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
