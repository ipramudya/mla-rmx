import jsCookie from "js-cookie";

export const CLIENT_SESSION_ACCESS_TOKEN = "cs_at";

export const userClientSession = {
	setAccessToken: (session: string) => {
		jsCookie.set(CLIENT_SESSION_ACCESS_TOKEN, session);
	},
	getAccessToken: () => jsCookie.get(CLIENT_SESSION_ACCESS_TOKEN) || "",
	clearAccessToken: () => jsCookie.remove(CLIENT_SESSION_ACCESS_TOKEN),
};
