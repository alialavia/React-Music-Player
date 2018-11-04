import * as fc from "fast-check";
import { padInt, formatSeconds } from "./Helpers.js";

/* Helpers for test functions. MAX_SIZE forces a limit on test cases for faster testing.*/
const MAX_SIZE = 1e4;
let NEG_INT = fc.nat(MAX_SIZE).map(i => -i - 1);
let POS_INT = fc.nat(MAX_SIZE);

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
		POS_INT,
		a => expect(numOfDigits(a)).toBe(a.toString().length)
	);

	testProperty(
		"For negative numbers, should be equal to their string representation length - 1",
		NEG_INT,
		a => expect(numOfDigits(a)).toBe(a.toString().length - 1)
	);
});

describe("padInt test suite", function() {
	testProperty(
		"Padding cannot be negative and should throw exception",
		POS_INT,
		NEG_INT,
		(a, b) => expect(() => padInt(a, b)).toThrow()
	);

	testProperty(
		"For negative numbers, the result's length should be 1 more than the padding, to account for the negative sign",
		NEG_INT,
		POS_INT,
		(a, b) =>
			expect(padInt(a, b).length).toBe(
				numOfDigits(a) > b ? numOfDigits(a) + 1 : b + 1
			)
	);

	testProperty(
		"For positive numbers, the result's length should be eqaul to the padding",
		POS_INT,
		POS_INT,
		(a, b) =>
			expect(padInt(a, b).length).toBe(
				numOfDigits(a) > b ? numOfDigits(a) : b
			)
	);

	testProperty(
		"The returned string, when parsed, should be eual to its input",
		POS_INT,
		POS_INT,
		(a, b) => expect(parseInt(padInt(a, b))).toBe(a)
	);
});

describe("formatSeconds test suite", function() {
	testProperty("length should always >= 5", POS_INT, a =>
		expect(formatSeconds(a).length).toBeGreaterThanOrEqual(5)
	);

	testProperty("seconds length === 2", POS_INT, a =>
		expect(formatSeconds(a).split(":")[1].length).toBe(2)
	);

	testProperty("minutes length >= 2", POS_INT, a =>
		expect(formatSeconds(a).split(":")[0].length).toBeGreaterThanOrEqual(2)
	);

	testProperty(
		"converting back to seconds should return the same result",
		POS_INT,
		a => {
			let x = formatSeconds(a)
				.split(":")
				.map(e => parseInt(e));
			expect(a).toBe(x[0] * 60 + x[1]);
		}
	);
});
