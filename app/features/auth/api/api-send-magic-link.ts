import publicAPIHandler from "app/functions/public-api-handler";

export default async function sendMagicLink(email: string) {
	return await publicAPIHandler("/auth/check-availability-email", {
		method: "POST",
		body: JSON.stringify({ email }),
		credentials: "include",
	});
}
