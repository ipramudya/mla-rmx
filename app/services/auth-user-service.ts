import publicAPIHandler from "app/functions/public-api-handler";

export async function refreshAccessToken(cookie?: string) {
	return await publicAPIHandler<{ access_token: string }>("/auth/refresh", {
		method: "POST",
		credentials: "include",
		...(cookie ? { headers: { Cookie: cookie } } : undefined),
	});
}
