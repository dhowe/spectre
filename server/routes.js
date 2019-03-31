let router = require('express').Router();
let controller = require('./user-controller');

router.route('/users')
    .get(controller.list)
    .post(controller.create);

router.route('/users/:user_id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

router.route('/users/similar/:user_id')
    .get(controller.similar)

module.exports = router;
