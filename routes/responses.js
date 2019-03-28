const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
let Survey = require('../models/survey');

// Get survey from created surveys list 
router.get('/:id', (req, res, next) => {
	Survey.findById(req.params.id).then( survey => {
	  res.render('responses/fillout', {survey});
  })
});
	
module.exports = router;