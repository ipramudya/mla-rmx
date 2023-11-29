import jsCookie from "js-cookie";

const FIVE_MINUTES = new Date(new Date().getTime() + 5 * 60 * 1000);
export const CLIENT_SESSION_ACCESS_TOKEN = "cs_at";

export const userClientSession = {
	setAccessToken: (session: string) => {
		jsCookie.set(CLIENT_SESSION_ACCESS_TOKEN, session, {
			expires: FIVE_MINUTES,
		});
	},
	getAccessToken: () => jsCookie.get(CLIENT_SESSION_ACCESS_TOKEN) || "",
	clearAccessToken: () => jsCookie.remove(CLIENT_SESSION_ACCESS_TOKEN),
};
