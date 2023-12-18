import jsCookie from "js-cookie";

export const ORGS_SESSION_ACCESS_TOKEN = "cs_oat";

export const orgsClientSession = {
	setAccessToken: (session: string) => {
		jsCookie.set(ORGS_SESSION_ACCESS_TOKEN, session, {
			sameSite: "Lax",
		});
	},
	getAccessToken: () => jsCookie.get(ORGS_SESSION_ACCESS_TOKEN) || "",
	clearAccessToken: () => jsCookie.remove(ORGS_SESSION_ACCESS_TOKEN),
};
