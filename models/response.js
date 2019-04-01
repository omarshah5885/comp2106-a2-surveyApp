const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Answer = require('./answer').schema;

const Response = new Schema({
	surveyId: {
		type: String,
		required: true
	},
	answers: [Answer]
});


module.exports = mongoose.model('Response', Response);