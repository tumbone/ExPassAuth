var User = require('../models/user.model');
var ObjectID = require('mongodb').ObjectId;

var userIdExpression = (userId) => {
  return { '_id': new ObjectID(userId) };
};
var usernameExpression = (username) => {
  return { 'username': username };
};

var userService = {
  getAllUsers: () => {
    return User.find();
  },
  getUserById: (userId) => {
    return User.findOne(userIdExpression(userId), '-password');
  },
  getUserByUsername: (username) => {
    return User.findOne(usernameExpression(username));
  },
  createUser: (user) => {
    var userModel = new User(user);
    return userModel.save(user);
  },
  updateUser: (userId, user) => {
    return User.findOneAndUpdate(userIdExpression(userId), user, { 'new': true });
  },
  resetUserPassword: (userId, encryptedPassword) => {
    return User.findByIdAndUpdate(userId, { $set: { 'password': encryptedPassword } }, '-password');
  },
  deleteUser: (userId) => {
    return User.findOneAndRemove(userIdExpression(userId));
  },
  dropUsersCollection: () => {
    return User.collection.drop();
  }
};

module.exports = userService;
