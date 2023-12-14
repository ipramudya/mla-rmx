import protectedAPIHandler from "app/functions/protected-api-handler";
import type { OrganizerUser } from "app/types";

type MeResponse = {
	organizer: OrganizerUser;
};

export async function me(cookie?: string) {
	return await protectedAPIHandler<MeResponse>("/organizers/me", {
		method: "GET",
		asOrganizer: true,
		headers: {
			Cookie: cookie || "",
		},
	});
}
