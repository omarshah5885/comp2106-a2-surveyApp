// authentication based off Brad Traversy's repository, https://github.com/bradtraversy/nodekb
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
let User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// GET register form
router.get('/register', function (req, res) {
  res.render('register');
});

// POST register process w/ validation using express-validator
router.post('/register', [check('username').custom(async value => {
    var user = await User.find({username: value})
    return user.length == 0;
  }).withMessage('Email already registered')], function (req, res) {
  const username = req.body.username; // username refers to the email input
  const password = req.body.password;
  const password2 = req.body.password2;

  // password validation 
  req
    .checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors});
  } else {
    let newUser = new User({username, password});

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt
        .hash(newUser.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(function (err) {
            if (err) {
              console.log(err);
              return;
            } else {
              req.flash('success', 'You are now registered and can log in');
              res.redirect('/users/login');
            }
          });
        });
    });
  }
});

// GET login form
router.get('/login', function (req, res) {
  res.render('login');
});

// POST login process
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout 
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;