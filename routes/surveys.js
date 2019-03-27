const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');
let Survey = require('../models/survey');
let Question = require('../models/question');


// List of surveys 
router.get('/', (req, res, next) => {
  Survey.find({ endDate: { $lt: new Date() } }).then( surveys => {
    res.render('surveys/surveylist', { surveys });
  });
});

// create survey 
router.get('/create', (req, res, next) => {
  res.render('surveys/create', {});
});

// post survey 
router.post('/create', (req, res, next) => {
  const newSurvey = new Survey();
  newSurvey.surveyTitle = req.body.surveyTitle;
  newSurvey.startDate = new Date();
  newSurvey.endDate = new Date();
  newSurvey.questions = [];
  req.body.questionEntry.forEach( (questionEntry, index) => {
    const question = new Question();
    question.questionType = req.body.questionType[index];
    question.questionEntry = questionEntry;
    newSurvey.questions.push(question);
  });
  newSurvey.save(err => {
    if (err) return next(err);

    res.redirect('/surveys');
  });
});

module.exports = router;