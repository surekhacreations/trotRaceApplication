/* eslint-disable no-undef */
require("dotenv").config();
let mongoose = require("mongoose");
const expect = require("expect");
const race = require("../model/raceSchema");

describe("Integration test for fetching races", () => {
	beforeAll(async () => {
		mongoose.connect(process.env.TEST_DB_CONN).then(() => {
			console.log("getRace: Test case connected to DB.");
		}).catch((err) => {
			console.error("getRace: Test case error while attempting to connect to DB...", err);
		});
	});

	afterAll(async () => {
		mongoose.connection.close();
		await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
	});

	describe("MongoDB Integration Testing: getRace", () => {
		it("can display saved races", (done) => {
			try {
				race.findOne().or([{ "event" : "finish" },{ "event" : "start" }])
					.then((res) => {
						console.log("Race response returned from DB:", res);
						expect(res._id).toBeTruthy();
						done();
					})
					.catch((err) => {
						console.log("Error: getRace: ", err);
					});
			} catch(err) {
				console.error("Error: IntegrationTest: getRace: ", err);
			}
		});
	});
});
