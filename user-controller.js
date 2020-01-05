import UserModel from './user-model';
import clfDate from 'clf-date';
import multer from 'multer';
import path from 'path';

/*
TODO: every call should return a uniform object:
{
  "status": code,
  "message": "a user-readable message",
  "data": "<payload object>"
}
*/
const USER_NOT_FOUND = 452;
const USER_WO_TRAITS = 453;
const NUM_SIMILARS = 6;

const list = async (req, res) => {

  await UserModel.getAll(function(err, users) {
    if (err) return sendError(res, 'UserModel.getAll', err);
    sendResponse(res, users);
  });
};

const current = async (req, res) => { // not used at present

  if (!req.params.hasOwnProperty('cid')) {
    return sendError(res, 'ClientId(cid) required');
  }

  await UserModel.findOne({ clientId: req.params.cid }, {}, {
    sort: { 'createdAt': -1 }
  }, (err, user) => {
    if (err) return sendError(res, 'UserModel.findOne', err);
    if (!user) return sendError(res, 'No current user found', USER_NOT_FOUND);
    sendResponse(res, { id: user._id });
  });
};

const createBatch = async (req, res) => {

  //console.log('REQ',req);
  const users = req.body;
  if (!users || !Array.isArray(users)) {
    return sendError(res, 'No users in request body');
  }

  await UserModel.insertMany(users, (err, result) => {
    if (err) {
      return sendError(res, 'UserModel.insertMany', err);
    }
    else {
      sendResponse(res, result);
    }
  });
};

const create = async (req, res) => {

  if (!(req.body.login && req.body.loginType)) return sendError(res,
    "UserModel with no login/loginType:" + JSON.stringify(req.body));

  if (!req.body.clientId) return sendError(res,
    "UserModel with no clientId:" + JSON.stringify(req.body));

  let user = new UserModel();
  Object.assign(user, req.body); // dangerous?

  await UserModel.find({ login: req.body.login, loginType: req.body.loginType }, (e, docs) => {

    if (e || docs.length) return sendError(res, e || "Unique User Violation: " +
      req.body.login + '/' + req.body.loginType);

    user.save(err => {
      if (err) return sendError(res, err);
      // TODO: check for ocean-traits and return user with similars
      sendResponse(res, user);
    });

  });
};

const fetch = async (req, res) => {

  if (!req.params.hasOwnProperty('uid')) {
    return sendError(res, 'UserId required');
  }

  await UserModel.findById(req.params.uid, (err, user) => {
    if (err) return sendError(res, 'Error (findById) for #' + req.params.uid, err);
    if (!user) return sendError(res, 'No user #' + req.params.uid, 0, USER_NOT_FOUND);
    sendResponse(res, user);
  });
};

const update = async (req, res) => {

  if (!req.params.hasOwnProperty('uid')) {
    return sendError(res, 'UserId required');
  }

  let uid = req.params.uid;
  let limit = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit) : 6;

  await UserModel.findByIdAndUpdate(uid, req.body, { new: true }, (err, user) => {

    if (err) return sendError(res, 'Update fail #' + req.params.uid);
    if (!user) return sendError(res, 'No user #' + req.params.uid, 0, USER_NOT_FOUND);

    if (!user.hasOceanTraits()) {
      sendResponse(res, user);
      return;
    }

    user.findByOcean((err, sims) => {
      if (err) return sendError(res, 'Unable to findByOcean for #' + req.params.uid, err);
      user._doc.similars = sims.slice(0, NUM_SIMILARS); // why is _doc needed ?
      sendResponse(res, user);
    }, limit);
  });
}

const similars = async (req, res) => {

  if (!req.params.hasOwnProperty('uid')) {
    return sendError(res, 'UserId required');
  }

  let limit = NUM_SIMILARS; // default limit
  if (req.query.hasOwnProperty('limit')) {
    limit = parseInt(req.query.limit);
  }

  let uid = req.params.uid;
  await UserModel.findById(uid, (err, user) => {
    if (err) return sendError(res, 'Unable to find user #' + uid, err);
    if (!user) return sendError(res, 'No user #' + uid, 0, USER_NOT_FOUND);
    if (!user.traits || !user.traits.openness) return sendError
      (res, 'No traits for user #' + uid, 0, USER_WO_TRAITS);
    user.findByOcean((err, sims) => {
      if (err) return sendError(res, 'Unable to findByOcean for #' + req.params.uid, err);
      sendResponse(res, sims);
    }, limit);
  });
};

const remove = async (req, res) => {
  await UserModel.remove({ _id: req.params.uid }, (err) => {
    if (err) return sendError(res, 'Unable to delete user #' + req.params.uid, err);
    sendResponse(res, req.params.uid);
  });
};

const profiles = './client/public/profiles/';

const photo = async (req, res) => {

  if (typeof req.params.uid === 'undefined' ||
    req.params.uid === 'undefined') {
    return sendError(res, 'no uid sent');
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

  await upload(req, res, e => {
    if (e) return sendError(res, 'photo.upload', e);
    if (!req.file) return sendError(res, 'photo.upload: null req. file');
    //let url = req.protocol + "://" +  req.hostname + '/' + req.file.path;
    req.file.url = req.file.path.replace(/.*\/profiles/, '/profiles');
    //console.log('Upload: '+req.file.url);
    sendResponse(res, req.file);
  });
};

const photoset = async (req, res) => {

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

  await upload(req, res, e => {
    if (e) return res.status(400).send({ error: e });
    console.log("FILES: ", req.files);
    //let url = req.file.path.replace(/.*\/profiles/,'/profiles')});
    sendResponse(res, req.files);
  });
};

function sendResponse(res, data) {
  res.status(200).send({ status: 200, data: data, message: 'ok' });
}

function sendError(res, msg, e, code) {
  code = code || 400;
  msg = msg += ' [' + e ? e : '' + ']';
  console.log('[' + clfDate() + '] ::* ERROR', '"' + msg + '"', code);
  res.status(code).send({ status: code, data: null, message: msg });
}

export default { list, similars, create, fetch, update, remove, photo, photoset, current, createBatch }
