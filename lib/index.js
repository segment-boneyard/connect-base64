
/**
 * Middleware to set the request body from a base64 encoded query
 * parameter.
 *
 * @param {String} key  the querystring key to use for base64 data
 * @return {Function} req, res, next
 */

module.exports = function (key) {
  key = key || 'data';
  return function (req, res, next) {
    if (req.method !== 'GET') return next();
    if (!req.query) return next();
    var value = req.query[key];
    if (!value) return next();
    req.body = decode(value);
    next();
  };
};

/**
 * URL safe base64 decode.
 */

function decode(value){
	value = value.replace(/\-/g, '+').replace(/\_/g, '/');
	return new Buffer(value, 'base64').toString('utf8');
}