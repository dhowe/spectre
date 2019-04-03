let User = require('./user-model');

exports.list = function (req, res) {

  User.get(function (err, users) {
    if (err) return error(res, err);
    res.status(200).send(users);
  });
};

exports.similar = function (req, res) {

  if (!req.params.hasOwnProperty('uid')) {
    return error(res, 'UserId required');
  }
  User.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + req.params.uid);
    user.findByOcean(res, 1, (users) => res.status(200).send(users));
  });
};

exports.create = function (req, res) {

  //console.log('exports.create **********', Object.keys(req), req.body);
  if (!req.body.loginType) {
    return error(res, "Invalid User: no loginType");
  } else if (!req.body.name) {
    return error(res, "Invalid User: no name");
  } else if (!req.body.login) {
    return error(res, "Invalid User: no login");
  }

  let user = new User();
  Object.assign(user, req.body);

  user.save(function (err) {
    if (err) return error(res, err);
    res.status(200).send(user);
  });
};

exports.view = function (req, res) {

  User.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + req.params.uid);
    res.status(200).send(user);
  });
};

exports.update = function (req, res) {

  User.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to update user #' + req.params.uid);
    Object.assign(user, req.params).save((err, user) => {
      if (err) return error(res, 'Unable to save user #' + req.params.uid);
      res.status(200).send(user);
    });
    // user.name = req.params.name ? req.params.name : user.name;
    // user.gender = req.params.gender;
    // user.email = req.params.email;
    // user.phone = req.params.phone;
    //
    // user.save(function (err) {
    //   if (err) return error(res, err);
    //   res.json({
    //     status: 200,
    //     data: user
    //   });
    // });
  });
};

exports.delete = function (req, res) {

  User.remove({ _id: req.params.uid }, function (err, user) {
    if (err) return error(res, 'Unable to delete user #' + req.params.uid);
    res.status(200).send(req.params.uid);
  });
};

function error(res, err, code) {
  code = (typeof code !== 'undefined') ? code : 400;
  res.status(code).send({ error: err });
}
