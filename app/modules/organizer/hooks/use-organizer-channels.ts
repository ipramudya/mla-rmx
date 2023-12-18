import { useQuery } from "@tanstack/react-query";
import getOrganizerAccounts from "../api/get-organizers-accounts";

export default function useOrganizerChannels() {
	const { data: organizerChannels, isLoading } = useQuery({
		queryKey: ["organizer-channels"],
		queryFn: async () => await getOrganizerAccounts(),
	});

	return {
		organizerChannels,
		isLoading,
	};
}
