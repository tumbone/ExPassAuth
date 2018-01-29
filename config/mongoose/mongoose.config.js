var mongoose = require('mongoose');
var config = require('../config');
const dbURI = config.get('databaseConnectionString');

mongoose.Promise = require('bluebird');

mongoose.openConnection = function (callback) {
  mongoose.connect(dbURI, {
    useMongoClient: true
  }, callback);
};

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
