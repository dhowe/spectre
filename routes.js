import express from 'express';
import controller from './user-controller';

const router = express.Router();

// base route: /api

router.route('/users')
  .get(controller.list)
  .post(controller.create);

router.route('/users/:uid')
  .get(controller.view)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);

router.route('/users/current/:cid')
  .get(controller.current)

router.route('/users/similar/:uid')
  .get(controller.similar)

router.route('/users/photo/:uid')
  .post(controller.photo)

router.route('/users/photoset/:uid')
  .post(controller.photoset) // ????????

// router.route('/users/photo/:uid')
//   .post(controller.photoUpload)
// router.route('/post/images/') // tmp
//   .post(controller.postImages)
//

export default router;
