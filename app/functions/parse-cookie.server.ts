import { cookieToObject } from "./cookie-object.server";

export const parseCookie = (cookieString: string | null | undefined) => {
	let remap: Map<string, string>;

	if (!cookieString) {
		remap = new Map([]);
	} else {
		const cookieObjects = cookieToObject(cookieString)!;
		remap = new Map(Object.entries(cookieObjects));
	}

	return remap;
};
