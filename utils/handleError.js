'use strict';

function notFound(date, lang) {
  return `${date} don't have(or not yet) ${lang} version.`;
}

function common(error, response, body) {
  if (error) {
    //console.error(error);
    return 'unknown error';
  }

  if (response.statusCode === 400) {
    return body.msg;
  }

  if (response.statusCode === 404) {
    // console.error('response code 404');
    return 'don\'t have(or not yet) this language version';
  }

  if (response.statusCode !== 200) {
    // console.error('response code not 200', response.body);
    return 'response code not 200';
  }

  return '';
}

module.exports = {
  common: common,
  notFound: notFound
};

