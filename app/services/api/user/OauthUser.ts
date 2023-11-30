import publicAPIHandler from "app/functions/public-api-handler";

export class OAuthUser {
	public static async googleRedirect() {
		return await publicAPIHandler("/auth/google/redirect", { method: "GET" });
	}

	public static async googleLogin() {
		return await publicAPIHandler("/auth/google/login", {
			method: "GET",
			credentials: "include",
		});
	}

	public static async facebookRedirect() {
		return await publicAPIHandler("/auth/facebook/redirect", { method: "GET" });
	}

	public static async facebookLogin() {
		return await publicAPIHandler("/auth/facebook/login", {
			method: "GET",
			credentials: "include",
		});
	}
}
