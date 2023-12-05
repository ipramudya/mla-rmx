import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import getOrganizerAccounts, {
	GET_ORGANIZER_ACCOUNTS_QUERY_KEY,
} from "../../api-organizers-accounts";
import useSearchOrgs from "../Panel/Search/use-search-orgs";
import useSortOrgs from "../Panel/Sort/use-sort-orgs";

export default function useListOrganizers() {
	const { search } = useSearchOrgs();
	const { sort } = useSortOrgs();

	const queryKey = useMemo(() => {
		return !search && !sort
			? GET_ORGANIZER_ACCOUNTS_QUERY_KEY
			: [GET_ORGANIZER_ACCOUNTS_QUERY_KEY, search, sort];
	}, [search, sort]);

	const queryClient = useQueryClient();
	const { data: allOrgsResponse, isLoading } = useQuery({
		queryKey: [queryKey],
		queryFn: async () => await getOrganizerAccounts({ search: { name: search }, sort }),
	});

	return {
		allOrgsResponse,
		isLoading,
		refetch: async () => {
			await queryClient.refetchQueries({ queryKey: [queryKey], type: "all", exact: true });
		},
	};
}
