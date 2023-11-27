import { serviceHandler } from "app/services";

export default class OAuthUser {
	public static async googleRedirect() {
		return await serviceHandler("/auth/google/redirect", { method: "GET" });
	}

	public static async googleLogin() {
		return await serviceHandler("/auth/google/login", {
			method: "GET",
			credentials: "include",
		});
	}

	public static async facebookRedirect() {
		return await serviceHandler("/auth/facebook/redirect", { method: "GET" });
	}

	public static async facebookLogin() {
		return await serviceHandler("/auth/facebook/login", {
			method: "GET",
			credentials: "include",
		});
	}
}
