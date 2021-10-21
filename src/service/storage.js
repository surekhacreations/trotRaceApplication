const Race = require("../model/raceSchema");

const saveRace = async (raceData) => {
	const race = await Race.create(raceData);
    return race;
};

module.exports.saveRace = saveRace;