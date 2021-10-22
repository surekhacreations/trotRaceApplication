const mongoose = require('mongoose');
const { MONGO_URI, DB_NAME } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI+DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to database.");
    })
    .catch((error) => {
        console.log("Database connection failed. Exiting now...");
        console.error(error);
        process.exit(1);
    });
}