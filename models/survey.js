const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./question').schema;

const Survey = new Schema({
	surveyTitle: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	questions: [Question]
});


module.exports = mongoose.model('Survey', Survey);