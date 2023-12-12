import protectedAPIHandler from "app/functions/protected-api-handler";

export default async function logout() {
	return await protectedAPIHandler("/auth/user/logout", {
		method: "POST",
	});
}
