const config = require("../utility/config.json");

//common error function for un-authorized (401) error
const unAuthorizedError = (err) => {
	const error = new Error(err);
	error.statusCode = config.statusCode.unAuthorized;
	return error;
};

module.exports.unAuthorizedError = unAuthorizedError;