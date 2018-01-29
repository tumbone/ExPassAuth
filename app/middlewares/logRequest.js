var config = require('../../config/config');
var logger = config.logger().getLogger('app.middlewares.logRequest');

var httpStatusCodes = require('../constants/httpStatusCodes');

module.exports = function (req, res, next) {
  logger.debug('Request: method:%s, url=%s, body=%s', req.method, req.originalUrl, JSON.stringify(req.body));
  if (logger.isLevelEnabled('info')) {
    logger.info(`${req.method} ${req.originalUrl}`);
  }
  if (logger.isLevelEnabled('debug')) {
    logger.debug(`headers: ${JSON.stringify(req.headers)}`);
  }
  try {
    next();
  } catch (err) {
    if (logger.isLevelEnabled('error')) {
      logger.error(`An error occurred. ${JSON.stringify(err)}`);
    }
    res.status(httpStatusCodes.InternalServerError).send(err);
  }
};
