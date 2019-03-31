let User = require('./user-model');

exports.list = function (req, res) {

  User.get(function (err, users) {
    if (err) return error(res, err);
    res.json({
      status: 1,
      data: users
    });
  });
};

exports.similar = function (req, res) {

  User.findById(req.params.user_id, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + req.params.user_id);
    let similars = user.findByOcean(5);
    res.json({
      status: 1,
      data: similars
    });
  });
};

exports.create = function (req, res) {

  if (!req.body.loginType) {
    return error(res, "Invalid user: must provide a loginType");
  } else if (!req.body.name) {
    return error(res, "Invalid user: must provide a name");
  } else if (!req.body.login) {
    return error(res, "Invalid user: must provide a login");
  }

  let user = new User();
  user.name = req.body.name;
  user.login = req.body.login;
  user.gender = req.body.gender;
  user.loginType = req.body.loginType;

  user.save(function (err) {
    if (err) return error(res, err);
    res.json({
      status: 1,
      data: user
    });
  });
};

exports.view = function (req, res) {

  User.findById(req.params.user_id, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + req.params.user_id);
    res.json({
      status: 1,
      data: user
    });
  });
};

exports.update = function (req, res) {

  User.findById(req.params.user_id, function (err, user) {
    if (err) return error(res, 'Unable to update user #' + req.params.user_id);

    user.name = req.body.name ? req.body.name : user.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;

    user.save(function (err) {
      if (err) return error(res, err);
      res.json({
        status: 1,
        data: user
      });
    });
  });
};

exports.delete = function (req, res) {

  User.remove({ _id: req.params.user_id }, function (err, user) {
    if (err) return error(res, 'Unable to delete user #' + req.params.user_id);
    res.json({
      status: 1,
      data: 'User deleted'
    });
  });
};

function error(res, err, code) {

  code = (typeof code != 'undefined') ? code : 400
  res.json({ status: code, message: err });
  return code;
}
