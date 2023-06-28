const User = require('../models/user');

module.exports = {
  index: (req, res, next) => {
    res.sendFile('single-user');
  },

  fetch: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId).lean()
      .then((result) => {
        console.log('User\'s data successfully retrieved...!');
        res.json(result);
      })
      .catch((err) => {
        console.log(err.stack);
        next(err);
      });
  },

  delete: (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(() => {
        console.log('User successfully removed...!');
        res.locals.redirect = '/users-table';
        next();
      })
      .catch((err) => {
        console.log('Error removing user account:', err.message);
        next(err);
      });
  },

  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },
}
