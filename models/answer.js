const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema({
	questionId: {
		type: ObjectId,
		required: true
	},
	shortAnswer:{
		type: String
	},
	mcSelection: {
		type: String
	}
});


module.exports = mongoose.model('Answer', Answer);