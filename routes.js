import express from 'express';
import controller from './user-controller';

const router = express.Router();

// base route: /api

router.route('/users')
  .get(controller.list)
  .post(controller.create);

router.route('/users/:uid')
  .get(controller.fetch)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);

router.route('/users/similars/:uid')
  .get(controller.similars)

router.route('/users/recents/:uid')
  .get(controller.recents)

router.route('/users/targets/:uid')
  .get(controller.recents)

router.route('/users/photo/:uid')
  .post(controller.photo)

// router.route('/users/current/:cid')
//   .get(controller.current)

// router.route('/users/message/:uid')
//   .get(controller.message) // unused

// router.route('/users/photoset/:uid')
//   .post(controller.photoset) // unused

router.route('/users/batch')
  .post(controller.createBatch);

export default router;
