import { useQuery } from "@tanstack/react-query";
import getOrganizerAccounts, {
	GET_ORGANIZER_ACCOUNTS_QUERY_KEY,
} from "../api/get-organizers-accounts";

export default function useOrganizerChannels() {
	const { data: organizerChannels, isLoading } = useQuery({
		queryKey: [GET_ORGANIZER_ACCOUNTS_QUERY_KEY],
		queryFn: async () => await getOrganizerAccounts(),
	});

	return {
		organizerChannels,
		isLoading,
	};
}
