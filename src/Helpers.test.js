import * as jsc from "jsverify";
import * as fc from "fast-check";
import { padInt, formatSeconds } from "./Helpers.js";

function testProperty(name, ...args) {
	return test(name, () => {
		fc.assert(fc.property(...args));
	});
}

function numOfDigits(n) {
	if (n == 0) return 1;
	if (n < 0) return numOfDigits(-n);
	return Math.floor(Math.log10(n)) + 1;
}

describe("numOfDigits test suite", () => {
	testProperty(
		"For positive numbers, should be equal to their string representation length",
		fc.nat(100),
		a => numOfDigits(a) === a.toString().length
	);

	testProperty(
		"For negative numbers, should be equal to their string representation length - 1",
		fc.integer(-100,-1),
		a => numOfDigits(a) === a.toString().length - 1
	);
});

describe("padInt test suite", function() {
	testProperty(
		"Padding cannot be negative and should throw exception",
		fc.nat(100),
		fc.nat(100),
		(a, b) => jsc.throws(() => padInt(a, -b - 1))
	);

	testProperty(
		"For negative numbers, the result's length should be 1 more than the padding, to account for the negative sign",
		fc.nat(100),
		fc.nat(100),
		(a, b) =>
			padInt(-a - 1, b).length ===
			(numOfDigits(-a - 1) > b ? numOfDigits(-a - 1) + 1 : b + 1)
	);

	testProperty(
		"For positive numbers, the result's length should be eqaul to the padding",
		fc.nat(100),
		fc.nat(100),
		(a, b) => {
			return (
				padInt(a, b).length ===
				(numOfDigits(a) > b ? numOfDigits(a) : b)
			);
		}
	);

	testProperty(
		"The returned string, when parsed, should be eual to its input",

		fc.nat(100),
		fc.nat(100),
		(a, b) => parseInt(padInt(a, b)) === a
	);
});

describe("formatSeconds test suite", function() {
	testProperty(
		"length should always >= 5",
		fc.nat(100),
		a => formatSeconds(a).length >= 5
	);

	testProperty(
		"seconds length === 2",

		fc.nat(100),
		a => formatSeconds(a).split(":")[1].length === 2
	);

	testProperty(
		"minutes length >= 2",

		fc.nat(100),
		a => formatSeconds(a).split(":")[0].length >= 2
	);

	testProperty(
		"converting back to seconds should return the same result",
		fc.nat(100),
		a => {
			let x = formatSeconds(a)
				.split(":")
				.map(e => parseInt(e));
			return a === x[0] * 60 + x[1];
		}
	);
});
