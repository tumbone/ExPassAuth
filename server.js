
var express = require('express');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');

var cors = require('cors');
var compression = require('compression');
var config = require('./config/config');
var passport = config.passport();
passport();
var db = config.mongoose();
db.openConnection();

// SeedData (Add a user if user db collection is empty)
require('./config/seeddb/users.seedservice')();

var logger = config.logger().getLogger('server');
// Configuration - Start-up parameter "NODE_ENV"
var port = process.env.PORT || 3000;

var enableSsl = config.get('enableSsl');

// Creating our server
var app = express();
var options = {};
var server = !enableSsl ? http.createServer(app) : https.createServer(options, app);
var routeConfig = require('./app/routes');

app.use(compression());
app.use(cors());

// Body (POST) parameters
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ defaultCharset: 'ISO-8859-1' }));
app.use(bodyParser.text());

// Configuring routes
routeConfig.register(app);

// startup our app at http://localhost:3000
logger.debug('Trying to host on port: ' + port);
server.listen(port, function () {
  logger.info('Service listening on port ' + port);
});

module.exports = app;
