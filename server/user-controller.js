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

  let limit = Number.MAX_SAFE_INTEGER;
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

  if (!req.body.loginType) return error(res, "Bad UserModel: no loginType");
  if (!req.body.login) return error(res, "Bad UserModel: no login");

  let user = new UserModel();
  Object.assign(user, req.body);

  user.save(function (err) {
    if (err) return error(res, err);
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

  UserModel.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to update user #' + req.params.uid);
    Object.assign(user, req.params).save((err, user) => {
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

  code = (typeof code !== 'undefined') ? code : 400;
  res.status(code).send({ error: err });
}

export default { list, similar, create, view, update, remove }
