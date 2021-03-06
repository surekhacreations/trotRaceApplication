const Race = require("../model/raceSchema");

const saveRace = async (raceData) => {
	try {
		return await Race.create(raceData); //save race data in the data base
	} catch(error) {
		console.error("Error: saveRace: ", error);
		process.exit(1);
	}
};

module.exports.saveRace = saveRace;