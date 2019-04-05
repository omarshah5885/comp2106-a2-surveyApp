const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let Survey = require('../models/survey');
let Response = require('../models/response');
let Answer = require('../models/answer');


// enable the flat function https://stackoverflow.com/questions/50993498/flat-is-not-a-function-whats-wrong
Object.defineProperty(Array.prototype, 'flat', {
	value: function(depth = 1) {
	  return this.reduce(function (flat, toFlatten) {
		return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
	  }, []);
	}
});


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
	// Survey.find().then( surveys => {
	// res.render('responses/stats', {surveys})
	// });
	Response.find(req.params.id).sort('surveyId').then( responses => {
		// return array of answers
		let response = responses.map( (response, index) => {
			return response.answers;
		});
		
		// flaten array of answers 
		flatResponse = response.flat(2);
		let answer = flatResponse.map( (answer, index) => {
			return answer.response;
		  });

		// use reduce method to collate all the responses 
		const answers = answer.reduce( (obj, response) => {
			// condition checks to see if answer exists; if not, assign obj w/ key of that answer a value of 0
			if( !obj[response] ) obj[response] = 0;
			// add to that list of answers in order to keep track
			obj[response]++;
			return obj;
		  }, {} );

		  // stringify responses to display onto html
		  answersString = JSON.stringify(answers, null, 2);
		  console.log(answers);
		res.render('responses/stats', {answers: answersString});
  });
});

	
module.exports = router;