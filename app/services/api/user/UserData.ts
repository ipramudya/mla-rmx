import { protectedServiceHandler } from "app/services";
import type { OrganizerAccounts, ParticipantUser } from "app/types";

type MeResponse = {
	user: ParticipantUser;
};

type GetOrganizerAccountsResponse = {
	organizers: OrganizerAccounts[];
};

export default class UserData {
	public static async me() {
		return await protectedServiceHandler<MeResponse>("/users/me", { method: "GET" });
	}

	public static async getOrganizerAccounts() {
		return await protectedServiceHandler<GetOrganizerAccountsResponse>("/organizers/accounts", {
			method: "GET",
		});
	}
}
