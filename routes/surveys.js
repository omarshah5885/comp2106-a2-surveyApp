const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
let Survey = require('../models/survey');
let Question = require('../models/question');
let MultipleChoice = require('../models/multiplechoice');

// List of surveys 
router.get('/', (req, res, next) => {
  Survey.find({ endDate: {$lt: new Date()} }).then( surveys => {
    res.render('surveys/surveylist', { surveys });
  });
});

// create survey 
router.get('/create', (req, res, next) => {
  res.render('surveys/create', {});
});



// process survey form
router.post('/create', (req, res, next) => {
  console.log(req.body);
  const newSurvey = new Survey();
  newSurvey.surveyTitle = req.body.surveyTitle;
  newSurvey.startDate = new Date();
  newSurvey.endDate = new Date();
  newSurvey.questions = [];

  let questionEntry = req.body.questionEntry;
  questionEntry.forEach( (questionEntry, index) => {
    // create new question object per every question entry 
    const question = new Question();

    // ensure questiontype indices matchup with each question entered into survey form
    question.questionType = req.body.questionType[index];

    // ensuring each question entry from form is contained inside the question object 
    question.questionEntry = questionEntry;

    if (question.questionType==1) {
      question.multipleChoices = req.body['option' + ++index].map( item => {
        const multiplechoice = new MultipleChoice();
        multiplechoice.option = item;
        return multiplechoice;
      }); // end map      
    } 
    // pushing question object into the questions array that is contained in the survey object 
    newSurvey.questions.push(question);
  });
  newSurvey.save(err => {
    if (err) return next(err);

    res.redirect('/surveys');
  });
});

module.exports = router;