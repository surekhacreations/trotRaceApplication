const mongoose = require("mongoose");
const { MONGO_URI, DB_NAME } = process.env;

module.exports = function () {
	mongoose.Promise = global.Promise;
	return mongoose.connect(`${MONGO_URI}+${DB_NAME}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};