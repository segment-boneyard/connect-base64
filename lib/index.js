
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
    var base64 = req.query[key];
    if (!base64) return next();
    req.body = new Buffer(base64, 'base64').toString('utf8');
    next();
  };
};