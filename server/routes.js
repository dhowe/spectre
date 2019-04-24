import express from 'express';
import controller from './user-controller';

const router = express.Router();

// base route: /spectre/api

router.route('/users')
  .get(controller.list)
  .post(controller.create);

router.route('/users/:uid')
  .get(controller.view)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.remove);

router.route('/users/similar/:uid')
  .get(controller.similar)

export default router;
