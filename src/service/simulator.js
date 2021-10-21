const auth = require("./authenticate");
const results = require("./results");
const raceResultHandler = require("./storage");
const config = require('../utility/config.json');

const fetchRaceResults = async (token) => {
    try{
        const raceResp = await results.getResults(token);
        console.log('raceResp...', raceResp.statusCode, raceResp.body);
        if(raceResp) {
            if(raceResp.statusCode === config.statusCode.unAuthorized) {
                console.log("Authentication token is missing, or does not match an active session");
                process.exit(1);
            } else if(raceResp.statusCode === config.statusCode.requestTimedOut) {
                console.log("Request timed out while waiting for new events. Re-authenticate.");
                trotRaceSimulator();
            } else if(raceResp.statusCode === config.statusCode.successfulRequest) {
                console.log("Successfully fetched race data. Store in DB...", raceResp.body);
                console.log("Keep fetching race data..");
                const race = await raceResultHandler.saveRace(raceResp.body);
                console.log("Race after saving...", race);
                fetchRaceResults(token);
            }
        }
    } catch(error) {
        console.log("In catch of fetchRaceResults ...", error.statusCode);
        if(error.statusCode === config.statusCode.unAuthorized) {
            console.log("Unauthorised access");
            trotRaceSimulator();
        }
    }
}

const trotRaceSimulator = async () => {
    try {
        const authRes = await auth.authenticate();
        console.log("token received:", authRes.body.token);

        if(authRes.body.token && authRes.statusCode) {
            const statusCode = authRes.statusCode;
            if(statusCode === config.statusCode.unAuthorized) {
                console.log("Invalid credentials");
                process.exit(1);
            } else if(statusCode === config.statusCode.serverBusy){
                console.log("Server is busy. This will happen if too many users are logged in simultaneously. Wait and try again");
                process.exit(1);
            } else if(statusCode === config.statusCode.successfulRequest){
                console.log("Successful Authentication!");
                fetchRaceResults(authRes.body.token);
            }
        }
    } catch(error) {
        console.error("In catch of trotRaceSimulator...", error);    //Session has expired. Re-authenticate
        trotRaceSimulator();
    }
    
}

module.exports.trotRaceSimulator = trotRaceSimulator;