var express = require('express');
var logRequest = require('./middlewares/logRequest.js');
var userController = require('./controllers/user.controller');
var authController = require('./controllers/auth.controller');
var passport = require('passport');

module.exports = {
  register: function (app, socket) {
    var router = express.Router();
    router.use('*', [logRequest]);
    router.use('/healthcheck', require('express-healthcheck')());
    router.use('/auth', authController);
    router.use('*', passport.authenticate('jwt', { session: false }));
    router.use('/users', userController);
    app.use(router);
  }
};
