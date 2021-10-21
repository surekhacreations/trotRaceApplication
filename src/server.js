require("dotenv").config();
require("./db/database").connect();

const simulator = require("./service/simulator");

try{
    simulator.trotRaceSimulator();
} catch(error) {
    console.error("In catch...", error);
    simulator.trotRaceSimulator();
}
