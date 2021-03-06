const mongoose = require("mongoose");

// structure of our database collection/table
const raceSchema = new mongoose.Schema({
	event: {
		type: String,
		default: null
	},
	horse: {
		id: {
			type: String,
			default: null
		},
		name: {
			type: String,
			default: null
		}
        
	},
	time: {
		type: String,
		default: null
	}
});

module.exports = mongoose.model("race", raceSchema);