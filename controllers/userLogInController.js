const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  index: (req, res) => {
    res.sendFile("login");
  },

  loginUser: (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    User.findOne({
      email
    }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            console.log('You have successfully logged in...!');
            res.locals.redirect = '/users';
            next();
          } else {
            console.log('Log in failed...!');
            res.locals.redirect = '/login';
            next();
          }
        });
      } else {
        console.log('User not found...!');
        res.locals.redirect = '/login';
        next();
      }
    }).catch((err) => {
      console.error(err.stack);
      next(err)
    });
  },

  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  }
}
