import * as jsc from "jsverify";
import { padInt, formatSeconds } from "./Helpers.js";

describe("padInt test suite.", function() {
	jsc.property(
		"padInt(-a, +b).length should always be equal to b+1",
		jsc.uint16,
		jsc.uint16,
		(a, b) => padInt(-a - 1, b).length === b + 1
	);

	jsc.property(
		"padInt(+a, +b) should always be equal to b",
		jsc.uint16,
		jsc.uint16,
		(a, b) => padInt(a, b).length === b
	);

	jsc.property(
		"padInt(a, +b) should always be equal to b",
		jsc.uint16,
		jsc.uint16,
		(a, b) => padInt(a, b).length === b
	);

	jsc.property("padInt(a, -b) should throw", jsc.uint16, jsc.uint16, (a, b) =>
		jsc.throws(() => padInt(a, -b - 1))
	);

	jsc.property(
		"padInt return value, when parsed, should be eual to its input",
		jsc.int16,
		jsc.uint16,
		(a, b) => parseInt(padInt(a, b)) === a
	);
});

describe("formatSeconds test suite.", function() {

	jsc.property(
		"length should always >= 5",
		jsc.uint16,
		a => formatSeconds(a).length >= 5
	);
	
	jsc.property("seconds length === 2", 
		jsc.uint16, 
		a => formatSeconds(a).split(":")[1].length === 2);
	
	jsc.property("minutes length >= 2", 
		jsc.uint16, 
		a => formatSeconds(a).split(":")[0].length >= 2);

	jsc.property("converting back to seconds should return the same result", 
		jsc.uint16, 
		a => {
			let x = formatSeconds(a).split(":").map(e => parseInt(e));
			return a === x[0] * 60 + x[1];
		});
});
