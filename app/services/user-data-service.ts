import protectedAPIHandler from "app/functions/protected-api-handler";
import type { ParticipantUser } from "app/types";

type MeResponse = {
	user: ParticipantUser;
};

export async function userMe(cookie?: string | null) {
	return await protectedAPIHandler<MeResponse>("/users/me", {
		method: "GET",
		headers: {
			Cookie: cookie || "",
		},
	});
}
