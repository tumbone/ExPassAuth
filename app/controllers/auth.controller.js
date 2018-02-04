var config = require('../../config/config');
var logger = config.logger().getLogger('app.controllers.authController');
var httpStatusCodes = require('../constants/httpStatusCodes');
var express = require('express');
var router = express.Router();
var authOrchestrator = require('../orchestrations/auth.orchestration');

function success(res, result) {
  logger.debug(result);
  res.json(result);
}

function error(res, err) {
  logger.error(err);
  res.status(httpStatusCodes.InternalServerError).send(err.message);
}

router.post('/signup', function (req, res) {
  authOrchestrator.signUpUser(req.body).then((result) => success(res, result)).catch((err) => error(res, err));
});
router.post('/login', function (req, res) {
  authOrchestrator.loginUser(req.body).then((result) => success(res, result)).catch((err) => error(res, err));
});
router.get('/verifytoken/:token', function (req, res) {
  try {
    var decoded = authOrchestrator.verifyToken(req.params.token);
    success(res, decoded);
  } catch (err) {
    error(res, err);
  }
});

module.exports = router;
