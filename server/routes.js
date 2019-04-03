let router = require('express').Router();
let controller = require('./user-controller');

// base route: /spectre/api

router.route('/users')
  .get(controller.list)
  .post(controller.create);

router.route('/users/:uid')
  .get(controller.view)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.delete);

router.route('/users/similar/:uid')
  .get(controller.similar)

module.exports = router;
