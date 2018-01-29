var config = require('../../config/config');
var logger = config.logger().getLogger('app.controllers.userController');
var httpStatusCodes = require('../constants/httpStatusCodes');
var express = require('express');
var router = express.Router();
var userOrchestrator = require('../orchestrations/user.orchestration');

function success (res, result) {
  logger.debug(result);
  res.json(result);
}
function error (res, err) {
  logger.error(err);
  res.status(httpStatusCodes.InternalServerError).send(err);
}

router.get('', function (req, res) {
  userOrchestrator.getAllUsers().then((result) => success(res, result)).catch((err) => error(res, err));
});
router.get('/:id', function (req, res) {
  userOrchestrator.getUserById(req.params.id).then((result) => success(res, result)).catch((err) => error(res, err));
});
router.post('', function (req, res) {
  userOrchestrator.createNewUser(req.body).then((result) => success(res, result)).catch((err) => error(res, err));
});
router.put('/:id', function (req, res) {
  userOrchestrator.updateUser(req.params.id, req.body).then((result) => success(res, result)).catch((err) => error(res, err));
});
router.put('/resetpassword/:id', function (req, res) {
  userOrchestrator.resetUserPassword(req.params.id, req.body.password).then((result) => success(res, result)).catch((err) => error(res, err));
});
router.delete('/:id', function (req, res) {
  userOrchestrator.deleteUser(req.params.id).then((result) => success(res, result)).catch((err) => error(res, err));
});

module.exports = router;
