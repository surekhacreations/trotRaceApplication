/* eslint-disable no-undef */
require("dotenv").config();
let mongoose = require("mongoose");
const expect = require("expect");
const simulator = require("../service/simulator");

describe("Integration test for posting races", () => {
	let mockExit;
   
	beforeAll(async () => {
		mongoose.connect(process.env.TEST_DB_CONN).then(() => {
			console.log("postRace: Test case connected to DB.");
		}).catch((err) => {
			console.log("postRace: Test case error while attempting to connect to DB.", err);
		});
	});

	afterAll(async () => {
		mongoose.connection.close();
		await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
	});

	describe("MongoDB Integration Testing: postRace ", () => {
		it("can post races", (done) => {
			try {
				simulator.trotRaceSimulator();
				setTimeout(() => {
					mongoose.connection.close();
					mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
						expect(mockExit).toHaveBeenCalledWith(1);
						expect(mockExit).toBeTruthy();
					});
					done();
				}, 3000);
			} catch(err) {
				console.error("Error: IntegrationTest: postRace: ", err);
			}
		});
	});
});
