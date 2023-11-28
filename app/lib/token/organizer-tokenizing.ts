import jsCookie from "js-cookie";

export default class OrganizerTokenizing {
	public static setAccessToken(s: string) {
		jsCookie.set("oat", s);
	}

	public static getAccessToken() {
		return jsCookie.get("oat") || "";
	}

	public static clearAccessToken() {
		jsCookie.remove("oat");
	}
}
