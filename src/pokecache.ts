export type CacheEntry<T> = {
	createdAt: number;
	val: T;
}

export class Cache {
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;
	#reapIntervalID: ReturnType<typeof setInterval> | undefined;
	#cache = new Map<string, CacheEntry<any>>();

	constructor(interval: number) {
		this.#interval = interval;

		this.#startReapLoop();
	}

	#startReapLoop() {
		this.#reapIntervalID = setInterval(this.#reap.bind(this), this.#interval);
	}

	stopReapLoop() {
		clearInterval(this.#reapIntervalID);

		this.#reapIntervalID = undefined;
	}

	#reap() {
		const allowedTimeSpan = Date.now() - this.#interval;

		for (const [key, value] of this.#cache) {
			if (value.createdAt < allowedTimeSpan) {
				this.#cache.delete(key);
			}
		}
	}

	add<T>(key: string, val: T) {
		this.#cache.set(key, { createdAt: Date.now(), val });
	}

	get<T>(key: string): T | undefined {
		return this.#cache.get(key)?.val;
	}
}
