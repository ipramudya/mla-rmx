import protectedAPIHandler from "app/functions/protected-api-handler";
import type { OrganizerAccounts, ParticipantUser } from "app/types";

type MeResponse = {
	user: ParticipantUser;
};

type GetOrganizerAccountsResponse = {
	organizers: OrganizerAccounts[];
};

export class UserData {
	public static async me(cookie?: any) {
		return await protectedAPIHandler<MeResponse>("/users/me", {
			method: "GET",
			headers: {
				Cookie: cookie,
			},
		});
	}

	public static async getOrganizerAccounts() {
		return await protectedAPIHandler<GetOrganizerAccountsResponse>("/organizers/accounts", {
			method: "GET",
		});
	}
}
