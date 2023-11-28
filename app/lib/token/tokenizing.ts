import jsCookie from "js-cookie";

export default class Tokenizing {
	public static setAccessToken(s: string) {
		jsCookie.set("at", s);
	}

	public static getAccessToken() {
		return jsCookie.get("at") || "";
	}

	public static clearAccessToken() {
		jsCookie.remove("at");
	}
}
