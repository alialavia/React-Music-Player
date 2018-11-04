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
		a => expect(numOfDigits(a)).toBe(a.toString().length)
	);

	testProperty(
		"For negative numbers, should be equal to their string representation length - 1",
		fc.integer(-100, -1),
		a => expect(numOfDigits(a)).toBe(a.toString().length - 1)
	);
});

describe("padInt test suite", function() {
	testProperty(
		"Padding cannot be negative and should throw exception",
		fc.nat(100),
		fc.nat(100),
		(a, b) => expect(() => padInt(a, -b - 1)).toThrow()
	);

	testProperty(
		"For negative numbers, the result's length should be 1 more than the padding, to account for the negative sign",
		fc.nat(100),
		fc.nat(100),
		(a, b) =>
			expect(padInt(-a - 1, b).length).toBe(
				numOfDigits(-a - 1) > b ? numOfDigits(-a - 1) + 1 : b + 1
			)
	);

	testProperty(
		"For positive numbers, the result's length should be eqaul to the padding",
		fc.nat(100),
		fc.nat(100),
		(a, b) =>
			expect(padInt(a, b).length).toBe(
				numOfDigits(a) > b ? numOfDigits(a) : b
			)
	);

	testProperty(
		"The returned string, when parsed, should be eual to its input",
		fc.nat(100),
		fc.nat(100),
		(a, b) => expect(parseInt(padInt(a, b))).toBe(a)
	);
});

describe("formatSeconds test suite", function() {
	testProperty("length should always >= 5", fc.nat(100), a =>
		expect(formatSeconds(a).length).toBeGreaterThanOrEqual(5)
	);

	testProperty(
		"seconds length === 2",

		fc.nat(100),
		a => expect(formatSeconds(a).split(":")[1].length).toBe(2)
	);

	testProperty(
		"minutes length >= 2",

		fc.nat(100),
		a => expect(formatSeconds(a).split(":")[0].length).toBe(2)
	);

	testProperty(
		"converting back to seconds should return the same result",
		fc.nat(100),
		a => {
			let x = formatSeconds(a)
				.split(":")
				.map(e => parseInt(e));
			expect(a).toBe(x[0] * 60 + x[1]);
		}
	);
});
