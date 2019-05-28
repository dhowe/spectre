import UserModel from './user-model';
import multer from 'multer';
import path from 'path';

const list = function (req, res) {

  UserModel.getAll(function (err, users) {
    if (err) return error(res, err);
    res.status(200).send(users);
  });
};

const current = function (req, res) {

  UserModel.findOne({ clientId: req.params.uid }, {}, {
    sort: { 'createdAt': -1 }
  }, (err, user) => {
    if (err) return error(res, err);
    res.status(200).send({ id: user._id });
  });
};

const create = function (req, res) {

  if (!(req.body.login && req.body.loginType)) return error(res,
    "UserModel with no login/loginType:" + req.body);

  if (!req.body.clientId) return error(res,
    "UserModel with no clientId:" + req.body);

  let user = new UserModel();
  Object.assign(user, req.body); // dangerous?

  UserModel.find({ login: req.body.login, loginType: req.body.loginType }, (e, docs) => {

    if (e || docs.length) return error(res, e || "Unique User Violation: " +
      req.body.login + '/' + req.body.loginType);

    user.save(function (err) {
      if (err) return error(res, err);
      //console.log('User.created #' + user._id + ': ' + user.login + "/" + user.loginType);
      res.status(200).send(user);
    });
  });
};

const view = function (req, res) {

  UserModel.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + req.params.uid);
    res.status(200).send(user);
  });
};

const update = function (req, res) {
  /*
   * Do the update:
   *   If the user HAS all 5 traits, but NOT similar users,
   *   then add them here
   */
  UserModel.findById(req.params.uid, function (err, user) {

    if (err) return error(res, 'No user #' + req.params.uid);

    if (user.hasOceanTraits() && user.similars.length < 1) {

      let limit = 8; // default limit
      if (req.query.hasOwnProperty('limit')) {
        limit = parseInt(req.query.limit);
      }

      user.findByOcean(8, (users) => {
        if (err) {
          console.error(res.statusCode, res.statusMessage,
            'Unable to add similar Users for user #' + req.params.uid, err);
          return;
        }
        users && users.map(u => user.similars.push(u._id+'||'+u.name));
      });
    }

    Object.assign(user, req.body).save((err, user) => {

      if (err) return error(res, 'Unable to update user #' + req.params.uid);
      res.status(200).send(user);
    });
  });
};

const similar = function (req, res) {

  if (!req.params.hasOwnProperty('uid')) {
    return error(res, 'UserId required');
  }

  let limit = 10; // default limit
  if (req.query.hasOwnProperty('limit')) {
    limit = parseInt(req.query.limit);
  }

  let uid = req.params.uid;
  UserModel.findById(uid, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + uid);
    user.findByOcean(limit, (users) => {
      res.status(200).send(users);
    });
  });
};

const remove = function (req, res) {

  UserModel.remove({ _id: req.params.uid }, function (err, user) {
    if (err) return error(res, 'Unable to delete user #' + req.params.uid);
    res.status(200).send(req.params.uid);
  });
};

const profiles = './web-client/public/profiles/';

const photo = function (req, res) {

  if (typeof req.params.uid === 'undefined' ||
    req.params.uid === 'undefined') {
    return error(res,'no uid sent');
  }

  let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(profiles))
      },
      filename: (req, file, cb) => {
        cb(null, req.params.uid + //'-' + Date.now() +
          path.extname(file.originalname))
      }
    })
  }).single('profileImage');

  upload(req, res, e => {
    if (e) return error(res, e);
    if (!req.file) return error(res, 'E2: Null file');
    //let url = req.protocol + "://" +  req.hostname + '/' + req.file.path;
    req.file.url = req.file.path.replace(/.*\/profiles/,'/profiles');
    //console.log('Upload: '+req.file.url);
    res.status(200).send(req.file);
  });
};

const photoset = function (req, res) {

  //console.log("Routes.photoSet");

  if (typeof req.params.uid === 'undefined') {
    res.status(400).send({ error: 'no uid sent' });
  }

  console.log("Routes.uid: ", req.params.uid);

  let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(profiles))
      },
      filename: (req, file, cb) => {
        cb(null, req.params.uid + '-' + Date.now() +
          path.extname(file.originalname))
      }
    })
  }).array('photoSet', 10);

  upload(req, res, e => {
    if (e) return res.status(400).send({ error: e });
    console.log("FILES: ", req.files);
    //let url = req.file.path.replace(/.*\/profiles/,'/profiles')});
    res.status(200).send(req.files);
  });
};

function error(res, err, code) {
  //console.log("ERR:\n", JSON.stringify(err, null, 2));
  res.status(code || 400).send({ error: err });
}

export default { list, similar, create, view, update, remove, photo, photoset, current }
