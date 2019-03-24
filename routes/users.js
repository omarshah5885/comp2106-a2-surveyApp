// authentication based off Brad Traversy's repository, https://github.com/bradtraversy/nodekb
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user');
const passport = require('passport');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// GET register form
router.get('/register', function (req, res) {
  res.render('register');
});

// POST register process
router.post('/register', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req
    .checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors});
  } else {
    let newUser = new User({email, password});

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

// GET login
router.get('/login', function (req, res) {
  res.render('login');
});

module.exports = router;