var nconf = require('nconf');

Config.prototype.environment = 'dev';

function Config () {
  nconf.argv().env();
  this.environment = nconf.get('NODE_ENV') || 'dev';
  nconf.file(this.environment, './config/env/' + this.environment.toLowerCase() + '.json');
  nconf.file('default', './config/env/default.json');
}

Config.prototype.get = function (key) {
  return nconf.get(key);
};

Config.prototype.mongoose = function () {
  return require('./mongoose/mongoose.config');
};

Config.prototype.logger = function () {
  return require('./logger/log4js.logger');
};

Config.prototype.passport = function () {
  return require('./passport/passport.config');
};

module.exports = new Config();
