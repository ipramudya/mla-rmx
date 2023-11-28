export const parseCookie = (str: string): Record<string, string> =>
	str
		.split(";")
		.map((v) => v.split("="))
		.reduce((acc, v) => {
			// @ts-expect-error
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {});
