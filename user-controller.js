import UserModel from './user-model';

const list = function (req, res) {

  UserModel.getAll(function (err, users) {
    if (err) return error(res, err);
    res.status(200).send(users);
  });
};

const create = function (req, res) {

  //console.log('create', req.body.login, req.body.loginType);

  if (!req.body.loginType) return error(res, "Bad UserModel: no loginType");
  if (!req.body.login) return error(res, "Bad UserModel: no login");

  let user = new UserModel();
  Object.assign(user, req.body); // dangerous?

  // TODO: hack for failing unique constraints
  UserModel.find({ login: req.body.login, loginType: req.body.loginType }, (e, docs) => {

    if (e || docs.length) {
      return error(res, e || "Unique User Violation: " + req.body.login + '/' + req.body.loginType);
    }

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

    if (user.hasOceanTraits() && user.similarIds.length < 1) {

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
        users && users.map(u => user.similarIds.push(u._id));
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

function error(res, err, code) {
  //console.log("ERR:\n", JSON.stringify(err, null, 2));
  res.status(code || 400).send({ error: err });
}

export default { list, similar, create, view, update, remove }
