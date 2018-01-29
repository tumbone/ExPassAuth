var config = require('../config');
var logger = config.logger().getLogger('config.jwt');
var passport = require('passport');
var passportJwt = require('passport-jwt');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromHeader('authorization');
jwtOptions.secretOrKey = config.get('jwtOptions:secretOrKey');
var userService = require('../../app/services/user.service');

module.exports = function () {
  passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, done) {
    userService.getUserById(jwtPayload.id).then((user) => {
      if (!user) return done(null, false);
      done(null, user);
    }).catch(err => {
      logger.error(err);
      return done(null, false);
    });
  }));
};
