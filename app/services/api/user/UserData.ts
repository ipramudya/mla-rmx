import protectedServiceHandler from "app/functions/protected-service-handler";
import type { OrganizerAccounts, ParticipantUser } from "app/types";

type MeResponse = {
	user: ParticipantUser;
};

type GetOrganizerAccountsResponse = {
	organizers: OrganizerAccounts[];
};

export class UserData {
	public static async me(cookie?: any) {
		return await protectedServiceHandler<MeResponse>("/users/me", {
			method: "GET",
			headers: {
				Cookie: cookie,
			},
		});
	}

	public static async getOrganizerAccounts() {
		return await protectedServiceHandler<GetOrganizerAccountsResponse>("/organizers/accounts", {
			method: "GET",
		});
	}
}
