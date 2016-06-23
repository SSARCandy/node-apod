module.exports = function(error, response, callback) {
    if (error) {
      console.error(error);
      callback(error);
    }

    if (response.statusCode !== 200) {
      console.error('response code not 200', response);
      callback('response code not 200');
    }
};