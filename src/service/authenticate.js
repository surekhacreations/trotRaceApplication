const got = require('got');
const config = require("../utility/config.json");

const authenticate = async () => {
    try{
        const authRes = await got.post(config.serverDetails.host + config.serverDetails.authenticatePath, {
            json: {
                email: config.userDetails.email,
                password: config.userDetails.password
            },
            responseType: 'json'
	    });
        return  authRes;
    } catch(err){
        console.log("Error in authenticate...", err);
        const error = new Error("Unauthorised")
        error.statusCode = config.statusCode.unAuthorized;
        throw error;
    }
	
};

module.exports.authenticate = authenticate;