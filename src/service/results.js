const got = require('got');
const config = require("../utility/config.json");

const getResults = async (token) => {
    try{
        const body = await got.get(config.serverDetails.host + config.serverDetails.fetchResultsPath, {
            headers: {
                "Authorization": 'Bearer ' + token
            },
            responseType: 'json'
	    });
        return body;
    } catch(err) { 
        console.log("Error in results...!!", err);
        const error = new Error("Unauthorised")
        error.statusCode = config.statusCode.unAuthorized;
        throw error;
    }
};

module.exports.getResults = getResults;