var config = require('../config');
var logger = config.logger().getLogger('app.usersSeedService');
var userService = require('../../app/services/user.service');

module.exports = function () {
  var usersSeedData = config.get('seedData:users');
  logger.info('Attempting to seed users...');
  userService.getAllUsers().then((result) => {
    if (result.length > 0) {
      logger.info('User(s) exist, no need to seed.');
    } else {
      usersSeedData.forEach(user => {
        userService.createUser(user).then((result) => {
          logger.info('User seeded successfully');
        }).catch((error) => {
          logger.error(error);
        }
          );
      });
    }
  });
};
