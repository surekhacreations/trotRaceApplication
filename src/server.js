require("dotenv").config();
require("./db/database").connect();
require("./service/simulator").trotRaceSimulator();