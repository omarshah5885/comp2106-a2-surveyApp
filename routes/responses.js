const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let Survey = require('../models/survey');
let Response = require('../models/response');
let Answer = require('../models/answer');


// Get a specific survey from created surveys list 
router.get('/:id', (req, res, next) => {
	Survey.findById(req.params.id).then( survey => {
	  res.render('responses/fillout', {survey});
  });
});

// after user posts a response to a survey 
router.post('/:id', (req, res, next) => {
	const surveyResponse = new Response();
	// set an id for each survey response to that survey's unique _Id
	surveyResponse.surveyId = req.body.id;

	console.log(req.body);

	// now I will create our answer object which is nested inside our response model
	// before I create answer object, I will delete the survey id as our Answer model has two keys: questionId and response
	delete req.body.id; 
	console.log(req.body);
	
	// get the key names used for each question. These names represent the GUID for each question and will serve as questionId
	let answerKeys = Object.keys(req.body);

	// set the survey answers to the response from the surey.
	surveyResponse.answers = answerKeys.map( answerKey => {
		// create an answer for each response.
		const answer = new Answer();

		// set question id to the GUID that comes from questions array of objects from survey model.
		answer.questionId = answerKey;

		// set response of each answer to the value of each answerKey
		answer.response = req.body[answerKey];
		
		return answer;
	});

	surveyResponse.save(err => {
	  if (err) return next(err);
  
		res.redirect('/surveys/');
	});
});

router.get('/stats/:Id', (req, res, next) => {
	Response.find(req.params.id).populate('surveyTitle').then( responses => {
	  res.render('responses/stats', {responses});
  });
});



// User.find()
//     .populate('surveyTitle') // multiple path names in one requires mongoose >= 3.6
//     .exec(function(err, usersDocuments) {
//         // handle err
//         // usersDocuments formatted as desired
//     });
  
	
module.exports = router;