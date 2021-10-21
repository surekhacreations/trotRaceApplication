const config = require("../utility/config.json");

const unAuthorizedError = (err) => {
    const error = new Error(err);
    error.statusCode = config.statusCode.unAuthorized;
    return error;
};

module.exports.unAuthorizedError = unAuthorizedError;