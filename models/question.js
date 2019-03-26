const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MultipleChoice = require('./multiple-choice');

const Question = new Schema({
	questionType: {
		type: Number,
		required: true
	},
	questionEntry: {
		type: String,
		required: true
	},
	multipleChoices: [MultipleChoice]
});


module.exports = mongoose.model('Question', Question);