const config = require('../config');
var log4js = require('log4js');
let environment = config.environment;
let log4jsConfig = 'log4js.json';
if (environment === 'dev') {
  log4jsConfig = 'log4js.dev.json';
}

log4js.configure(`./config/env/${log4jsConfig}`, { reloadSecs: 60 });
module.exports = log4js;
