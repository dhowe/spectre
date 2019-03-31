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
    if (err) return error(res, 'Unable to find user #'+req.params.user_id);
    let users = User.findByOcean(user, 5);
    res.json({
      status: 1,
      data: users
    });
  });
};

// Handle create user actions
exports.create = function (req, res) {

  let user = new User();
  user.name = req.body.name;
  user.login = req.body.login;
  user.loginType = req.body.loginType;
  user.gender = req.body.gender || '';

  // save the user and check for errors
  User.save(function (err) {
    if (err) return error(res, err);
    res.json({
      status: 1,
      data: user
    });
  });
};

// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) return error(res, 'Unable to find user #'+req.params.user_id);
    res.json({
      status: 1,
      data: user
    });
  });
};

// Handle update user info
exports.update = function (req, res) {

  User.findById(req.params.user_id, function (err, user) {
    if (err) return error(res, 'Unable to update user #'+req.params.user_id);

    user.name = req.body.name ? req.body.name : user.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;

    // save the user and check for errors
    user.save(function (err) {
      if (err) return error(res, err);
      res.json({
        status: 1,
        data: user
      });
    });
  });
};

// Handle delete user
exports.delete = function (req, res) {

  User.remove({ _id: req.params.user_id }, function (err, user) {
    if (err) return error(res, 'Unable to delete user #'+req.params.user_id);
    res.json({
      status: 1,
      data: 'User deleted'
    });
  });
};

function error(res, err) {
  res.json({
    status: 0,
    message: err,
  });
  return 0;
}
