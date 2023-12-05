import type { QueryStringBuilderParams } from "app/functions/build-query-string";
import buildQueryString from "app/functions/build-query-string";
import protectedAPIHandler from "app/functions/protected-api-handler";
import type { OrganizerAccounts } from "app/types";

type GetOrganizerAccountsResponse = {
	organizers: OrganizerAccounts[];
};

type QueryParams = QueryStringBuilderParams;

type OptionParams = {
	cookie: string;
};

export const GET_ORGANIZER_ACCOUNTS_QUERY_KEY = "organizer-accounts";

export default async function getOrganizerAccounts(params?: QueryParams, options?: OptionParams) {
	const qs = buildQueryString(params);

	return await protectedAPIHandler<GetOrganizerAccountsResponse>(`/organizers/accounts?${qs}`, {
		method: "GET",
		headers: options ? { Cookie: options.cookie } : undefined,
	});
}
