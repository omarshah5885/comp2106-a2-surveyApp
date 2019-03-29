const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema({
	questionId: {
		type: String,
		required: true
	},
	response:{
		type: String
	}
});


module.exports = mongoose.model('Answer', Answer);