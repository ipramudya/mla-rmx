import protectedAPIHandler from "app/functions/protected-api-handler";

export default async function logoutOrganizer() {
	return await protectedAPIHandler("/auth/organizer/logout", {
		method: "POST",
		asOrganizer: true,
	});
}
