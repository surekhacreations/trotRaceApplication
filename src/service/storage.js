const Race = require("../model/raceSchema");

const saveRace = async (raceData) => {
	const race = await Race.create(raceData);
    console.log("Race results fetched and saved in DB.");
    return race;
};

module.exports.saveRace = saveRace;