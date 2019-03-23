const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourcez');
});

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});
// POST register process



module.exports = router;
