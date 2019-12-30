import UserModel from './user-model';
import multer from 'multer';
import path from 'path';

/*
TODO: every call should return a uniform object:
{
  "status": "ok || error",
  "message": "a user-readable message",
  "data": "<payload object>"
}
*/

const list = function(req, res) {

  UserModel.getAll(function(err, users) {
    if (err) return error(res, err);
    res.status(200).send(users);
  });
};

const current = function(req, res) { // not used at present

  UserModel.findOne({ clientId: req.params.uid }, {}, {
    sort: { 'createdAt': -1 }
  }, (err, user) => {
    if (err) return error(res, err);
    res.status(200).send({ id: user._id });
  });
};

const createBatch = function(req, res) {

  //console.log('REQ',req);
  let users = req.body;

  if (!users || !Array.isArray(users)) return error
    (res, 'No users in request body');

  UserModel.insertMany(users, (err, result) => {
    if (err) {
      return error(res, err);
    }
    else {
      res.status(200).send(result);
    }
  });
};

const create = function(req, res) {

  if (!(req.body.login && req.body.loginType)) return error(res,
    "UserModel with no login/loginType:" + JSON.stringify(req.body));

  if (!req.body.clientId) return error(res,
    "UserModel with no clientId:" + JSON.stringify(req.body));

  let user = new UserModel();
  Object.assign(user, req.body); // dangerous?

  UserModel.find({ login: req.body.login, loginType: req.body.loginType }, (e, docs) => {

    if (e || docs.length) return error(res, e || "Unique User Violation: " +
      req.body.login + '/' + req.body.loginType);

    user.save(function(err) {
      if (err) return error(res, err);
      //console.log('User.created #' + user._id + ': ' + user.login + "/" + user.loginType);
      res.status(200).send(user);
    });
  });
};

const view = function(req, res) {

  UserModel.findById(req.params.uid, (err, user) => {
    if (err) return error(res, 'Unable to find user #' + req.params.uid);
    res.status(200).send(user);
  });
};

const update = function(req, res) {

  let uid = req.params.uid;
  let limit = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit) : 6;

  UserModel.findByIdAndUpdate(uid, req.body, { new: true }, (err, user) => {

    if (err) return error(res, 'Update fail #' + req.params.uid);

    if (!user.hasOceanTraits()) {
      res.status(200).send(user);
      return;
    }

    user.findByOcean((err, sims) => {
      if (err) return error(res, 'Unable to findByOcean for #' + req.params.uid);
      user._doc.similars = sims; // why is _doc needed ?
      res.status(200).send(user);
    }, limit);
  });
}

const update2 = function(req, res) {

  // add missing properties that can be computed
  const computeProperties = (user) => {
    //console.log('computeProperties', user.name);
    let mods = false;
    if (typeof user.descriptors === 'undefined' || !user.descriptors.length) {
      user.predictDescriptors();
      mods = true;
    }
    if (typeof user.influences === 'undefined' || !user.influences.length) {
      user.predictInfluences();
      mods = true;
    }
    return mods;
  };

  const saveAndRespond = (user, sims) => {
    if (!headersSent) {
      headersSent = true;
      console.log("ALMOST1....", user._id, user.similars.length);
      user.save((err, u) => {
        if (err) {
          console.error('ERROR(22): ', err, u);
          return error(res, 'Unable to update user #' + u._id);
        }
        console.log("ALMOST2....", u._id, u.similars.length);
        res.status(200).send(u);
      });
    }
  };

  let headersSent = false;
  UserModel.findByIdAndUpdate(req.params.uid, req.body, { new: true }, (err, user) => {

    if (err) {
      console.log("ERROR", err, err.error);
      return error(res, 'Update fail #' + req.params.uid);
    }

    if (user.hasOceanTraits()) {
      console.log('has traits');
      computeProperties(user); // can happen multiple times

      // do they have similars ?
      if (false && typeof user.similars === 'undefined' || user.similars.length === 0) {

        let limit = 6; // default limit
        req.query.hasOwnProperty('limit') && (limit = parseInt(req.query.limit));

        console.log('limit: ' + limit);
        user.findByOcean(sims => {
          if (err) return error(res, 'No similars for #' + req.params.uid);

          if (sims) {
            console.log('sims found: ', sims.length);
            // if so get their properties
            //let updated = [];
            user.similars = sims;
            sims.forEach((s) => computeProperties(s) && console.log('saving ' + s.name) && s.save(err));
            // UserModel.findByIdAndUpdate(s._id, s, { new: true }, function (err, s) {
            //   if (err) console.error(err + '\nUnable to update user #' + s._id);
            //   console.log('updated '+s._id);
            //   if (--count === 0) {
            //     console.log('PASSING Sims',sims.length);
            //     //saveAndRespond(user, sims);
            //   }
            // });
            // s.save((err, s) => {
            //   if (err) console.error(err + '\nUnable to update user #' + s._id);
            // });
            //}
            //});
          }

        }, limit);
        saveAndRespond(user);

      } else {

        console.log("NO SIMS ********, continuing");
      }
    }
    if (!headersSent) res.status(200).send(user);
  });
}

//
//   UserModel.findById(req.params.uid, function (err, user) {
//
//     if (err) return error(res, 'No user #' + req.params.uid);
//
//     if (user.hasOceanTraits()) {
//
//       computeProperties(user); // can happen multiple times
//
//       // do they have similars ?
//       if (typeof user.similars === 'undefined' || !user.similars.length) {
//
//         let limit = 6; // default limit
//         req.query.hasOwnProperty('limit') && (limit = parseInt(req.query.limit));
//
//         user.findByOcean(sims => limit,  {
//           if (err) return error(res, 'No similars for #' + req.params.uid);
//
//           console.log('sims found: ', sims.length);
//
//           // if so get their properties
//           0 &&sims.forEach((s) => {
//             if (computeProperties(s)) {
//               s.save((err, s) => {
//                 if (err) console.error(err + '\nUnable to update user #' + s._id);
//               });
//             }
//           });
//           saveAndRespond(user);
//         });
//         saveAndRespond(user);
//
//       } else {
//
//         console.log("NO SIMS ********, continuing");
//       }
//     }
//     saveAndRespond(user);
//   });
// }

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
//       user.findByOcean(sims => limit,{
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

const similars = function(req, res) {

  if (!req.params.hasOwnProperty('uid')) {
    return error(res, 'UserId required');
  }

  let limit = 10; // default limit
  if (req.query.hasOwnProperty('limit')) {
    limit = parseInt(req.query.limit);
  }

  let uid = req.params.uid;
  UserModel.findById(uid, (err, user) => {
    if (err) return error(res, 'Unable to find user #' + uid);
    user.findByOcean((err, sims) => {
      if (err) return error(res, 'Unable to findByOcean for #' + req.params.uid);
      res.status(200).send(sims);
    }, limit);
  });
};

const remove = function(req, res) {
  UserModel.remove({ _id: req.params.uid }, (err, user) => {
    if (err) return error(res, 'Unable to delete user #' + req.params.uid);
    res.status(200).send(req.params.uid);
  });
};

const profiles = './client/public/profiles/';

const photo = function(req, res) {

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

const photoset = function(req, res) {

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
  console.log("ERR:\n", JSON.stringify(err, null, 2));
  res.status(code || 400).send({ error: err });
}

export default { list, similars, create, view, update, remove, photo, photoset, current, createBatch }
