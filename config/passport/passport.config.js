var passport = require('passport');
var userService = require('../../app/services/user.service');

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    // Perhaps use User Orchestrator here
    userService.getUserById(id).then((user) => {
      return done(null, user);
    }).catch(err => { return done(err); });
  });

  require('../strategies/jwt')();
};
