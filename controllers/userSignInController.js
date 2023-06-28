const User = require('../models/user');
const emailValidator = require('deep-email-validator');

function isEmailValid(email) {
  return emailValidator.validate(email);
}

module.exports = {
  index: (req, res) => {
    res.sendFile('index.html');
  },

  users: (req, res, next) => {
    User.find()
      .then(result => {
        console.log("Users found...!");
        res.json(result);
      })
      .catch(err => {
        console.error(err.stack);
        next(err);
      });
  },

  usersTable: (req, res) => {
    res.sendFile("users-table");
  },

  signInFlash: (req, res) => {
    res.json({
      message: req.flash('info')
    });
  },

  createUser: async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body;

      if (!email || !password) {
        console.log('Email or password missing...!');
        res.locals.redirect = '/';
        next();
      }

      const {
        valid,
        reason,
        validators
      } = await isEmailValid(email);

      if (valid) {
        console.log("Email or password is valid...!");
        try {
          await User.create(req.body);
          console.log("User created successfully...!");
          req.flash('info', 'You are successfully Signed in...!');
          res.locals.redirect = '/users-table';
          next();
        } catch (err) {
          console.error(err.stack);
          req.flash('error info', err.message);
          res.locals.redirect = '/';
          next(err);
        }
      } else {
        console.log("Email or password not found...!");
        res.locals.redirect = '/';
        next();
      }
    } catch (err) {
      console.error(err.stack);
      next(err);
    } finally {
      console.log('User email validation is done...!');
    }
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
