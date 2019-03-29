const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
let Survey = require('../models/survey');
let Question = require('../models/question');
let MultipleChoice = require('../models/multiplechoice');



// List of active surveys for public view 
router.get('/', (req, res, next) => {
  // find survey's that are less than or equal to the current date only
  Survey.find({ endDate: {$lte: new Date()} }).then( surveys => {
    res.render('surveys/surveylist', { surveys });
  });
});

// add access control functionality 
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

router.use(ensureAuthenticated);

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
  newSurvey.endDate = req.body.endDate;
  newSurvey.questions = [];

  let questionEntry = req.body.questionEntry;
  questionEntry.forEach( (questionEntry, index) => {
    // create new question object per every question entry 
    // each question has a questiontype, questionentry, and multiplechoices key
    const question = new Question();

    // ensure questiontype matches up with each questiontype entered into survey form
    question.questionType = req.body.questionType[index];

    // ensure questionentry matches up with each question entered into survey form 
    question.questionEntry = questionEntry;

    // if questionType is m/c (or quesitontype w/ value of 1), then create a m/c object for that question
    if (question.questionType=="1") {
      index++; // increment the index so it starts at 1 to represent option 1

      // set the multiplechoices array equal to the options entered for each m/c question
      question.multipleChoices = req.body['option' + index].map( item => {

        // create a new multiplechoice object per questiontype 1 entry 
        const multiplechoice = new MultipleChoice();

        // set each option for the m/c
        multiplechoice.option = item;

        return multiplechoice;
      }); // end m/c map
    } 
    // push each question object into the questions array that is contained in the survey object 
    newSurvey.questions.push(question);
  });

  newSurvey.save(err => {
    if (err) return next(err);

    res.redirect('/surveys');
  });
});



module.exports = router;