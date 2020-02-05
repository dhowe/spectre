import UserModel from './user-model';
import Mailer from './mailer';
import clfDate from 'clf-date';
import multer from 'multer';
import path from 'path';
import { profDir } from './config';

/* all calls return a uniform object:
{
  "status": code,
  "message": "a user-readable message",
  "data": "<payload object>"
}*/

const USER_NOT_FOUND = 452;
const USER_WO_TRAITS = 453;
const NO_DATABASE = 454;
const NUM_SIMILARS = 6;

const create = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (!req || !req.body) return sendError(res, 'Req without body');

  const body = req.body;

  if (!(body.login && body.loginType)) return sendError(res,
    "Attempt to create User without login/loginType:" + JSON.stringify(body));

  if (!body.clientId) return sendError(res,
    "Attempt to create User without clientId:" + JSON.stringify(body));

  let user = new UserModel();
  Object.assign(user, body); // dangerous?

  try {
    await UserModel.find({ login: body.login, loginType: body.loginType }, (e, docs) => {

      if (e || docs.length) return sendError(res, e || "Unique User Violation: " +
        body.login + '/' + body.loginType);

      user.save(err => {
        if (err) return sendError(res, 'Unable to save user/' + err);
        // TODO: check for ocean-traits and return user with similars
        sendResponse(res, user);
      });
    });
  }
  catch(e) {
    console.error('Unable to find user: ' + JSON.stringify(body));
    return sendError(res, 'Unable to find user: ' + JSON.stringify(body));
  }
};

const list = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  await UserModel.getAll(function(err, users) {
    if (err) return sendError(res, 'UserModel.getAll', err);
    sendResponse(res, users);
  });
};

const message = async (req, res) => {

  // WORKING HERE

  //console.log('CONTROLLER.MESSAGE: stub sending message', req);
  const mailer = new Mailer({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await mailer.sendMessage({}, (err, info) => {
    if (err) console.error('[MAILER] ', err);
    sendResponse(res, err ? err : info);
  });

  // await UserModel.getAll(function(err, users) {
  //   if (err) return sendError(res, 'UserModel.getAll', err);
  //   sendResponse(res, users);
  // });
};

const current = async (req, res) => { // not used at present

  if (UserModel.databaseDisabled) return noDbError(res);

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

  if (UserModel.databaseDisabled) return noDbError(res);

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

const fetch = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

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

  if (UserModel.databaseDisabled) return noDbError(res);

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

  if (UserModel.databaseDisabled) return noDbError(res);

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

  if (UserModel.databaseDisabled) return noDbError(res);

  await UserModel.remove({ _id: req.params.uid }, (err) => {
    if (err) return sendError(res, 'Unable to delete user #' + req.params.uid, err);
    sendResponse(res, req.params.uid);
  });
};

const photo = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (typeof req.params.uid === 'undefined' ||
    req.params.uid === 'undefined') {
    return sendError(res, 'no uid sent');
  }

  // Destination here needs to be folder we are watching
  let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(profDir))
      },
      filename: (req, file, cb) => {
        cb(null, req.params.uid + '_raw' +
          path.extname(file.originalname))
      }
    })
  }).single('profileImage');

  try {
    // 2 steps here 1) write the file, 2) send filename to client
    await upload(req, res, e => {
      if (e) return sendError(res, 'photo.upload', e);
      if (!req.file) return sendError(res, 'photo.upload: null req. file');
      console.log('[' + clfDate() + '] ::* UPLOAD ' + req.file.path);

      // just for sending back to the client, but should use profDir instead ?
      req.file.url = req.file.path.replace(/.*\/profiles/, '/profiles');
      sendResponse(res, req.file);
    });
  }
  catch (e) {
    console.error('Unable to upload image', e);
  }
};

const photoset = async (req, res) => {

  //console.log("Routes.photoSet");

  if (UserModel.databaseDisabled) return noDbError(res);

  if (typeof req.params.uid === 'undefined') {
    res.status(400).send({ error: 'no uid sent' });
  }

  console.log("Routes.uid: ", req.params.uid);

  let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(profDir))
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
    sendResponse(res, req.files);
  });
};

function sendResponse(res, data) {
  let o = { status: 200, data: data, message: 'ok' };
  res.status(200).send(o);
}

function sendError(res, msg, e, code) {
  code = code || 499;
  msg = msg + (e ? ' [' + e + ']' : '');
  console.log('[' + clfDate() + '] ::* ERROR', msg, code, 'on:');
  res.status(code).send({ status: code, data: null, message: msg });
}

function noDbError(res) {
  res.status(NO_DATABASE).send({
    status: NO_DATABASE, data: null, message: 'Db unavailable'
  });
}

export default { list, similars, message, create, fetch, update, remove, photo, photoset, current, createBatch }
