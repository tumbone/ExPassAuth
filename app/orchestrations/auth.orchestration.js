const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var jwtOptions = {};
jwtOptions.secretOrKey = config.get('jwtOptions:secretOrKey');

var sanitizeResult = (userObj) => {
  // ToDo: Move this method to User Model
  if (userObj.password) {
    userObj = userObj.toObject();
    delete userObj.password;
  }
  return userObj;
}

class AuthOrchestration {
  loginUser(user) {
    let username = user.username || undefined;
    let password = user.password || undefined;
    return userService.getUserByUsername(username).then((result) => {
      if (!result) {
        throw new Error('No such user found.');
      }
      if (bcrypt.compareSync(password, result.password)) {
        var payload = { id: result._id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);

        return { user: sanitizeResult(result), token: token };
      } else {
        throw new Error('Incorrect password.');
      }
    });
  }
  signUpUser(user) {
    return userService.createUser(user).then(result => {
      if (!result) {
        throw new Error('An error occured creating new user.');
      }
      return sanitizeResult(result);
    });
  }
  verifyToken(token) {
    return jwt.verify(token, jwtOptions.secretOrKey);
  }
}

module.exports = new AuthOrchestration();
