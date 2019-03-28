const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
const mongoose = require('mongoose');
let Survey = require('../models/survey');
let Response = require('../models/response');
let Answer = require('../models/answer');


// Get survey from created surveys list 
router.get('/:id', (req, res, next) => {
	Survey.findById(req.params.id).then( survey => {
	  res.render('responses/fillout', {survey});
  })
});


router.post('/:id', (req, res, next) => {
	const newResponse = new Response();
	newResponse.surveyId = req.body.id;
	let keys = Object.keys(req.body);
	keys = keys.filter( key => {
		return key != 'id';
	})
	newResponse.answers = keys.map( key => {
		const answer = new Answer();
		answer.answer = req.body[key];
		answer.questionId = key;
		return answer;
	});
	newResponse.save(err => {
	  if (err) return next(err);
  
	res.redirect('/surveys/');
	});
  });
  
	
module.exports = router;