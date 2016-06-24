var common = function (error, response, callback) {
  if (error) {
    console.error(error);
    callback(error);
  }

  if (response.statusCode === 404) {
    console.error('response code 404');
    callback('Not found');
  }

  if (response.statusCode !== 200) {
    console.error('response code not 200', response);
    callback('response code not 200');
  }
};

var notFound = function (date, lang) {
  return `${date} don't have(or not yet) ${lang} version.`
};


module.exports = {
  common: common,
  notFound: notFound
};

