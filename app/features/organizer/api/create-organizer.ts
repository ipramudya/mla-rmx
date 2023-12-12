import protectedAPIHandler from "app/functions/protected-api-handler";
import type { CreateOrganizerPayload } from "../utils/create-organizer-schema";

export default async function createOrganizer({
	isLocked = false,
	password = null,
	...rest
}: CreateOrganizerPayload) {
	return await protectedAPIHandler("/auth/organizer/register", {
		method: "POST",
		body: {
			is_locked: isLocked,
			password,
			...rest,
		},
	});
}
