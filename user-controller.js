import UserModel from './user-model';

const list = function (req, res) {

  UserModel.getAll(function (err, users) {
    if (err) return error(res, err);
    res.status(200).send(users);
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
    user.findByOcean(res, limit, (users) => {
      res.status(200).send(users);
    });
  });
};

const create = function (req, res) {

  //console.log('create', req.body);

  if (!req.body.loginType) return error(res, "Bad UserModel: no loginType");
  if (!req.body.login) return error(res, "Bad UserModel: no login");

  let user = new UserModel();
  Object.assign(user, req.body); // dangerous

  user.save(function (err) {
    if (err) {
      //console.log(err);
      return error(res, err);
    }
    //console.log('User.created #'+user._id + ': ' + user.login + "/" + user.loginType);
    res.status(200).send(user);
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
   * TODO:
   *   If the user HAS all 5 traits, but NOT similar users,
   *   then add them here
   */
  UserModel.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to update user #' + req.params.uid);
    Object.assign(user, req.body).save((err, user) => {
      if (err) return error(res, 'Unable to save user #' + req.params.uid);
      res.status(200).send(user);
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
  res.status(code || 400).send({ error: err});
}

export default { list, similar, create, view, update, remove }
