const userService = require('../services/user.service');
const bcrypt = require('bcrypt');

class UserOrchestration {
  getAllUsers () {
    return userService.getAllUsers();
  }
  getUserById (userId) {
    return userService.getUserById(userId);
  }
  createNewUser (user) {
    return userService.createUser(user);
  }
  updateUser (userId, user) {
    if (user.password) delete user.password;
    return userService.updateUser(userId, user);
  }
  resetUserPassword (userId, password) {
    let encyptedPassword = bcrypt.hashSync(password, 10);
    return userService.resetUserPassword(userId, encyptedPassword);
  }
  deleteUser (userId) {
    return userService.deleteUser(userId);
  }
}

module.exports = new UserOrchestration();
