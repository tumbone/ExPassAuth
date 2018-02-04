const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var jwtOptions = {};
jwtOptions.secretOrKey = config.get('jwtOptions:secretOrKey');

class AuthOrchestration {
  loginUser (user) {
    let username = user.username || undefined;
    let password = user.password || undefined;
    return userService.getUserByUsername(username).then((result) => {
      if (!result) {
        throw new Error('No such user found.');
      }
      if (bcrypt.compareSync(password, result.password)) {
        var payload = { id: result._id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);

        result = result.toObject();
        if (result.password) delete result.password;

        return { user: result, token: token };
      } else {
        throw new Error('Incorrect password.');
      }
    });
  }
  verifyToken (token) {
    return jwt.verify(token, jwtOptions.secretOrKey);
  }
}

module.exports = new AuthOrchestration();
