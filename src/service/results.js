const got = require("got");
const config = require("../utility/config.json");
const authError = require("../utility/error.js");

const getResults = async (token) => {
	try{ // fetch race data from the server using auth token
		const body = await got.get(config.serverDetails.host + config.serverDetails.fetchResultsPath, {
			headers: {
				"Authorization": "Bearer " + token
			},
			responseType: "json"
		});
		return body;
	} catch(err) {
		console.error("Error: getResults: ", err);
		throw authError.unAuthorizedError(err);
	}
};

module.exports.getResults = getResults;