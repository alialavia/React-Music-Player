import * as jsc from "jsverify";
import { padInt, formatSeconds } from "./Helpers.js";

function numOfDigits(n) {
	if (n == 0) return 1;
	if (n < 0) return numOfDigits(-n);
	return Math.floor(Math.log10(n)) + 1;
}

describe("padInt test suite.", function() {
	jsc.property(
		"Padding cannot be negative and should throw exception",
		jsc.uint16,
		jsc.uint16,
		(a, b) => jsc.throws(() => padInt(a, -b - 1))
	);

	jsc.property(
		"For negative numbers, the result's length should be 1 more than the padding, to account for the negative sign",
		jsc.uint16,
		jsc.uint16,
		(a, b) =>
			padInt(-a - 1, b).length ===
			(numOfDigits(-a - 1) > b ? numOfDigits(-a - 1) + 1 : b + 1)
	);

	jsc.property(
		"For positive numbers, the result's length should be eqaul to the padding",
		jsc.uint16,
		jsc.uint16,
		(a, b) =>
			padInt(a, b).length === (numOfDigits(a) > b ? numOfDigits(a) : b)
	);

	jsc.property(
		"The returned string, when parsed, should be eual to its input",
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

	jsc.property(
		"seconds length === 2",
		jsc.uint16,
		a => formatSeconds(a).split(":")[1].length === 2
	);

	jsc.property(
		"minutes length >= 2",
		jsc.uint16,
		a => formatSeconds(a).split(":")[0].length >= 2
	);

	jsc.property(
		"converting back to seconds should return the same result",
		jsc.uint16,
		a => {
			let x = formatSeconds(a)
				.split(":")
				.map(e => parseInt(e));
			return a === x[0] * 60 + x[1];
		}
	);
});