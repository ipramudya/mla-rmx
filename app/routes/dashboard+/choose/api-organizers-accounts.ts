import protectedAPIHandler from "app/functions/protected-api-handler";
import type { OrganizerAccounts } from "app/types";

type GetOrganizerAccountsResponse = {
	organizers: OrganizerAccounts[];
};

export const GET_ORGANIZER_ACCOUNTS_QUERY_KEY = "organizer-accounts";

export default async function getOrganizerAccounts(cookie?: string) {
	return await protectedAPIHandler<GetOrganizerAccountsResponse>("/organizers/accounts", {
		method: "GET",
		headers: cookie ? { Cookie: cookie } : undefined,
	});
}
