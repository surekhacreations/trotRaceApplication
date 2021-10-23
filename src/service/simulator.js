const auth = require("./authenticate");
const results = require("./results");
const raceResultHandler = require("./storage");
const config = require("../utility/config.json");

const fetchRaceResults = async (token) => {
	try{
		const raceResp = await results.getResults(token); // fetch race data using auth token
		if(raceResp) {
			const statusCode = raceResp.statusCode;
			if(statusCode === config.statusCode.requestTimedOut) { // server took more than 15 seconds to respond
				console.error("Request timed out while waiting for new events. Re-authenticate.");
				trotRaceSimulator();
			} else if(statusCode === config.statusCode.successfulRequest) { // successfully fetched race data. Save in Database
				await raceResultHandler.saveRace(raceResp.body);
				console.log("Race results fetched and saved in DB.");
				fetchRaceResults(token); // keep fetching the race data from the server
			}
		}
	} catch(error) { // user session of 5 mins have expired. Authenticate the user again.
		console.error("Error: fetchRaceResults: ", error);
		if(error.statusCode === config.statusCode.unAuthorized) {
			console.error("Authentication token is missing, or does not match an active session");
			trotRaceSimulator();
		} else {
			process.exit(1);
		}
	}
};

const trotRaceSimulator = async () => {
	try {
		const authRes = await auth.authenticate(); //authenticate the user

		if(authRes.statusCode) {
			const statusCode = authRes.statusCode;
			if(statusCode === config.statusCode.requestTimedOut){ //if request is timed-out, authenticate user again, after sometime
				console.log("Server is busy. This will happen if too many users are logged in simultaneously. Wait and try again");
				setTimeout(() => {
					trotRaceSimulator();
				}, 60000);
			} else if(statusCode === config.statusCode.successfulRequest //if successful authentication, use the returned token to fetch the race data
                && authRes.body && authRes.body.token){
				console.log("Successful Authentication!");
				fetchRaceResults(authRes.body.token);
			}
		} else {
			throw new Error("Token not returned from Server.");
		}
	} catch(error) {
		console.error("Error: trotRaceSimulator: ", error);    //Session has expired. Re-authenticate
		if(error.statusCode !== config.statusCode.unAuthorized) {
			console.error("Invalid credentials or Session has expired. Auto re-authenticate in action.");
			trotRaceSimulator();
		}
	}
};

module.exports.trotRaceSimulator = trotRaceSimulator;