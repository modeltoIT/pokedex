import { describe, expect, test, vi } from "vitest";
import { Cache } from "./pokecache.js";

describe('Cache', () => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date(0));

	const cache = new Cache(500);

	test('set at 0 ms', async () => {
		cache.add<number>('1', 0);

		expect(cache.get<number>('1')).toEqual(0);
	})

	test('set at 50 ms', async () => {
	 	vi.advanceTimersByTime(50);


		cache.add<number>('2', 50);

	 	expect(cache.get<number>("1")).toEqual(0);
	 	expect(cache.get<number>("2")).toEqual(50);
	})

	test('finish at 1000 ms', async () => {
	 	vi.advanceTimersByTime(1000);

	 	expect(cache.get<number>("1")).toBeFalsy();
	 	expect(cache.get<number>("2")).toBeFalsy();
	})
})

