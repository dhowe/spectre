import UserModel from './user-model';
import User from './shared/user';
import Mailer from './mailer';
import clfDate from 'clf-date';
import multer from 'multer';
import path from 'path';
import { profDir } from './config';

//import childProcess from 'child_process';
//import fs from 'fs';
//const fsp = fs.promises;
//const fsp = require('fs').promises; // dont mix require and import

/* all calls return a uniform object:
{
  "status": code,
  "message": "a user-readable message",
  "data": "<payload object>"
}*/

const NO_USER_ID = 490;
const UNIQUE_USER_VIOLATION = 491;
const USER_NOT_FOUND = 492;
const USER_WO_TRAITS = 493;
const USER_WO_LOGIN = 494;
const NO_DATABASE = 495;
const NO_CLIENT_ID = 496;

const NUM_TARGETS = 6;

const create = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (!req || !req.body) return sendError(res, 'Request without body');

  const body = req.body;

  if (!(body.login && body.loginType)) return sendError(res, "API.create "
    + "requires login/loginType: " + JSON.stringify(body), 0, USER_WO_LOGIN);

  if (!body.clientId) return sendError(res, "API.create "
    + "requires clientId: " + JSON.stringify(body), 0, NO_CLIENT_ID);

  let user = new UserModel();
  Object.assign(user, body); // dangerous?

  // if (typeof user.clientId !== 'number') user.clientId = parseInt(user.clientId);
  // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log('IP:'+ip);

  try {
    await UserModel.find({ login: body.login, loginType: body.loginType }, (e, docs) => {

      if (e || docs.length) return sendError(res, e || "Unique User Violation: " +
        body.login + '/' + body.loginType, 0, UNIQUE_USER_VIOLATION);

      user.save(err => {
        if (err) return sendError(res, 'Unable to save user/', err);
        // TODO: check for ocean-traits and return user with similars
        sendResponse(res, user);
      });
    });
  }
  catch (e) {
    console.error('Unable to find user: ' + JSON.stringify(body));
    return sendError(res, 'Unable to find user: ' + JSON.stringify(body), e);
  }
};

const list = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  await UserModel.getAll(function(err, users) {
    if (err) return sendError(res, 'UserModel.getAll', err);
    sendResponse(res, users);
  });
};

/* NEED TO RETHINK
const message = async (req, res) => {

  // WORKING HERE
  // console.log('CONTROLLER.MESSAGE: stub sending message', req);

  const data = req.url.replace('/users/message/', '').split('&');
  const userId = data[0];
  const email = data[1]; //tmp

  console.log("user-controller.js:: message", userId, email);

  //await generateEmail(userId, email);


  // const mailer = new Mailer({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS
  //   }
  // });
  //
  // await mailer.sendMessage({
  //   from: 'spectre@spectreknows.me',
  //   to: 'spectre-test@email.com',
  //   subject: DEFAULT_SUBJ,
  //   html: DEFAULT_HTML
  // }, (err, info) => {
  //   if (err) console.error('[MAILER] ', err);
  //   sendResponse(res, err ? err : info);
  // });

  // await UserModel.getAll(function(err, users) {
  //   if (err) return sendError(res, 'UserModel.getAll', err);
  //   sendResponse(res, users);
  // });
};

const current = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (!req.params.hasOwnProperty('cid')) return sendError(res, 'No clientId sent');

  await UserModel.findOne({ clientId: req.params.cid }, {}, {
    sort: { 'createdAt': -1 }
  }, (err, user) => {
    if (err) return sendError(res, 'UserModel.findOne', err);
    if (!user) return sendError(res, 'No current user found', USER_NOT_FOUND);
    sendResponse(res, { id: user._id });
  });
};
*/

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

  if (!req.params.hasOwnProperty('uid')) return sendError
    (res, 'No uid sent', 0, NO_USER_ID);

  await UserModel.findById(req.params.uid, (err, user) => {
    if (err) return sendError(res, 'Error (findById) for #' + req.params.uid, err);
    if (!user) return sendError(res, 'No user #' + req.params.uid, 0, USER_NOT_FOUND);
    sendResponse(res, user);
  });
};

const update = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (!req.params.hasOwnProperty('uid') || req.params.uid === '-1') {
    return sendError(res, 'Invalid uid: ' + req.params.uid, 0, NO_USER_ID);
  }

  let uid = req.params.uid;
  let limit = req.query.hasOwnProperty('limit') ?
    parseInt(req.query.limit) : NUM_TARGETS;

  await UserModel.findByIdAndUpdate(uid, req.body, { new: true }, (err, user) => {

    if (err) return sendError(res, 'Update failed for user#' + req.params.uid);
    if (!user) return sendError(res, 'No user #' + req.params.uid, 0, USER_NOT_FOUND);

    // return if we don't yet have traits, or we already have similars
    if (!User.hasOceanTraits(user) || (user.similars && user.similars.length)) {
      sendResponse(res, user);
      return;
    }

    UserModel.findByOcean(user, limit, (err, sims) => {
      if (err) return sendError(res, 'FindByOcean failed for #' + uid, err);
      user.similars = sims;
      sendResponse(res, user);
    });
  });
}

const recents = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  let limit = req.query.hasOwnProperty('limit') ?
    parseInt(req.query.limit) : NUM_TARGETS;

  UserModel.findByRecent(req.params.uid || '-1', limit, (e, recents) => {
    if (e) return sendError(res, 'FindByRecent failed for #' + req.params.uid, e);
    sendResponse(res, recents);
  });
};

const targets = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (!req.params.hasOwnProperty('uid')) return sendError
    (res, 'No uid sent', 0, NO_USER_ID);

  let limit = NUM_TARGETS; // default limit
  if (req.query.hasOwnProperty('limit')) limit = parseInt(req.query.limit);

  let uid = req.params.uid;
  await UserModel.findById(uid, (err, user) => {

    if (err) return sendError(res, 'Unable to find user #' + uid, err);
    if (!user) return sendError(res, 'No user #' + uid, 0, USER_NOT_FOUND);
    if (!user.traits || !user.traits.openness) return sendError
      (res, 'No traits for user #' + uid, 0, USER_WO_TRAITS);

    UserModel.findTargets(user, limit, (err, sims) => {
      if (err) return sendError(res, 'Unable to findByOcean for #' + req.params.uid, err);
      sendResponse(res, sims);
    });
  });
};

const similars = async (req, res) => {

  if (UserModel.databaseDisabled) return noDbError(res);

  if (!req.params.hasOwnProperty('uid')) return sendError
    (res, 'No uid sent', 0, NO_USER_ID);

  let limit = NUM_TARGETS; // default limit
  if (req.query.hasOwnProperty('limit')) limit = parseInt(req.query.limit);

  let uid = req.params.uid;
  await UserModel.findById(uid, (err, user) => {

    if (err) return sendError(res, 'Unable to find user #' + uid, err);
    if (!user) return sendError(res, 'No user #' + uid, 0, USER_NOT_FOUND);
    if (!user.traits || !user.traits.openness) return sendError
      (res, 'No traits for user #' + uid, 0, USER_WO_TRAITS);

    UserModel.findByOcean(user, limit, (err, sims) => {
      if (err) return sendError(res, 'Unable to findByOcean for #' + req.params.uid, err);
      sendResponse(res, sims);
    });
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

  if (!req.params.hasOwnProperty('uid')) return sendError
    (res, 'No uid sent', 0, NO_USER_ID);

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
    return sendError(res, 'No uid sent', 0, NO_USER_ID);
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

/*  NEED TO RETHINK THIS
function runScript(scriptPath, args, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;

    const process = childProcess.fork(scriptPath, args);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });
}

function generateEmail(id, email) {
  runScript('scripts/generateEmail.js', ["-e " + email], function (err) {
    if (err) throw err;
    console.log('finished running generateEmail.js');
  });
}*/


export default {
  list, /*message,current*/targets, recents, create, fetch,
  similars, update, remove, photo, photoset, createBatch
};
