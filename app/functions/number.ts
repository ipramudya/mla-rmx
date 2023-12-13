export function generateNumber(start: number, end: number): number {
	if (start > end) {
		throw new Error("Start value must be less than or equal to end value");
	}

	return Math.floor(Math.random() * (end - start + 1)) + start;
}
