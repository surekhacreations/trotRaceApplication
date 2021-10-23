require("dotenv").config();
const initializeDatabase = require("./db/database");

initializeDatabase()
	.then(() => {
		console.log("Successfully connected to database.");
		require("./service/simulator").trotRaceSimulator();
	})
	.catch((error) => {
		console.error("Database connection failed. Exiting now...");
		console.error(error);
		process.exit(1);
	});