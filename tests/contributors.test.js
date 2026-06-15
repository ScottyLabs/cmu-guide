import { describe, expect, test } from "bun:test";

import {
	formatContributor,
	formatContributors,
} from "@/utils/contributors.ts";

describe("formatContributor", () => {
	test("formats a name and email", () => {
		expect(
			formatContributor({
				name: "Anish Pallati",
				email: "i@anish.land",
			}),
		).toBe("Anish Pallati <i@anish.land>");
	});

	test("falls back to the name when email is missing", () => {
		expect(formatContributor({ name: "Kavya" })).toBe("Kavya");
	});

	test("uses the existing empty fallback when only email is present", () => {
		expect(formatContributor({ email: "i@anish.land" })).toBeNull();
	});

	test("uses the existing empty fallback when name and email are missing", () => {
		expect(formatContributor({})).toBeNull();
	});

	test("preserves legacy string contributors", () => {
		expect(formatContributor("Kavya")).toBe("Kavya");
	});

	test("does not render empty angle brackets", () => {
		expect(formatContributor({ name: "Kavya", email: " " })).toBe("Kavya");
	});
});

describe("formatContributors", () => {
	test("removes unusable and duplicate display values while preserving order", () => {
		expect(
			formatContributors([
				{ name: "Amy Wang", email: "amy@example.com" },
				{ email: "missing-name@example.com" },
				{ name: "Amy Wang", email: "amy@example.com" },
				"Max Wen",
			]),
		).toEqual(["Amy Wang <amy@example.com>", "Max Wen"]);
	});
});
