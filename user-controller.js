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

// TODO: update 1
// 1. find the user by id OR ERROR
// 2. do the update OR ERROR
// 3. check for traits but not generated fields
// 4. if not, return 200/OK;
// 5. if so, generate the fields OR ERROR (ignore?)
// 6. re-update the user OR ERROR
// 7. return 200/OK

// TODO: update 2
// 1. find the user by id OR ERROR
// 2. check for traits but not generated fields
// 3. if so, generate fields  OR ERROR
// 4. update the user OR ERROR
// 5. return 200/OK

const update = function (req, res) {

  // add missing properties that can be computed
  const computeProperties = function(usr) {
    console.log('computeProperties', usr.name);
    if (typeof usr.descriptors === 'undefined' || !usr.descriptors.length) {
      usr.predictDescriptors();
    }
    if (typeof usr.influences === 'undefined' || !usr.influences.length) {
      usr.predictInfluences();
    }
  };

  UserModel.findById(req.params.uid, function (err, user) {

    if (err) return error(res, 'No user #' + req.params.uid);

    if (user.hasOceanTraits()) {

      computeProperties(user);

      // do they have similars ?
      if (typeof user.similars === 'undefined' || !user.similars.length) {

        let limit = 6; // default limit
        req.query.hasOwnProperty('limit') && (limit = parseInt(req.query.limit));

        user.findByOcean(limit, sims => {

          if (err) return error(res, 'No similars for #' + req.params.uid);
          console.log('found: ', sims.length);
          sims.forEach(computeProperties);
          res.status(200).send(user);
        });
      }
      else {
        console.log("NO SIMS ********");
      }
    }
    res.status(200).send(user);
  });
}

/*
 * Do the update:
 *   If the user HAS all 5 traits, but NOT similar users,
 *   then add them here
 */
// Object.assign(user, req.body); // assign new traits to user
//
//   user.save((err, user) => {
//     if (err) return error(res, 'Unable to update user #' + req.params.uid);
//
//     // TODO: if req.body has traits here, then call user.setTraits();
//     if (user.hasOceanTraits() && user.similars.length < 1) {
//
//       let limit = 6; // default limit
//       if (req.query.hasOwnProperty('limit')) {
//         limit = parseInt(req.query.limit);
//       }
//
//       user.findByOcean(limit, sims => {
//         //console.log('findByOcean',users.length, err);
//         if (err) {
//           console.error(res.statusCode, res.statusMessage,
//             'Unable to add similars for user #' + req.params.uid, err);
//           return;
//         }
//         // add descriptions for each similar if they don't have it
//         sims.forEach(s => {
//           if (s.hasOceanTraits() && (typeof s.descriptors === 'undefined' || s.descriptors.length < 1)) {
//             s.descriptors = s.generateSentences(3);
//           }
//         });
//         // add the most similars
//         sims && sims.map(({ _id, name, influences, descriptors }) => {
//           // here we specify which properties similars should get
//           user.similars.push(JSON.stringify(({ _id, name, influences, descriptors })));
//         });
//
//         user.save((err, usr) => {
//           if (err) return error(res, 'Unable to update user #' + req.params.uid);
//           res.status(200).send(usr);
//         });
//       });
//     } else {
//       res.status(200).send(user);
//     }
//   });
// };

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
    return error(res, 'no uid sent');
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
    req.file.url = req.file.path.replace(/.*\/profiles/, '/profiles');
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
