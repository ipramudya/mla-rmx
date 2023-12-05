import protectedAPIHandler from "app/functions/protected-api-handler";

type Purpose = "add" | "remove";

export default async function favoriteOrgs(organizerId: string, purpose: Purpose) {
	return await protectedAPIHandler(
		`/organizers/${purpose === "add" ? "favorite" : "unfavorite"}`,
		{
			method: "POST",
			body: { id: organizerId },
		},
	);
}
