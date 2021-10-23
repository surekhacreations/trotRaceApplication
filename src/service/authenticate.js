const got = require("got");
const config = require("../utility/config.json");
const authError = require("../utility/error.js");

const authenticate = async () => {
	try{ //authenticate the user
		const authRes = await got.post(config.serverDetails.host + config.serverDetails.authenticatePath, {
			json: {
				email: config.userDetails.email,
				password: config.userDetails.password
			},
			responseType: "json"
		});
		return authRes;
	} catch(err){
		console.error("Error: authenticate:", err);
		throw authError.unAuthorizedError(err);
	}
	
};

module.exports.authenticate = authenticate;