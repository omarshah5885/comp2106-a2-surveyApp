const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MultipleChoice = new Schema({
	option: {
		type: String,
		required: true
	}
});


module.exports = mongoose.model('MultipleChoice', MultipleChoice);