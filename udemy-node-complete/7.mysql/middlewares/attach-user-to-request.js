const User = require('../models/user');

const attachUserToRequest = (req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user; // Attach custom key to request
      next();
    })
    .catch(err => console.error(err))
};

module.exports = attachUserToRequest;
