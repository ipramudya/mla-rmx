import { Container, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "remeda";
import getOrganizerAccounts, {
	GET_ORGANIZER_ACCOUNTS_QUERY_KEY,
} from "../../api-organizers-accounts";
import EmptyOrgs from "../EmptyOrgs";
import useSearchOrgs from "../Panel/Search/use-search-orgs";
import ItemOrganizer from "./ItemOrganizer";
import ListOrganizerSkeleton from "./ListOrganizerSkeleton";

export default function ListOrganizer() {
	const { search } = useSearchOrgs();

	const { data: allOrgsResponse, isLoading } = useQuery({
		queryKey: [
			!search
				? GET_ORGANIZER_ACCOUNTS_QUERY_KEY
				: [...GET_ORGANIZER_ACCOUNTS_QUERY_KEY, search],
		],
		queryFn: async () => await getOrganizerAccounts({ search: { name: search } }),
	});

	return (
		<Container size="lg" w="100%">
			{allOrgsResponse === undefined || isLoading ? (
				<ListOrganizerSkeleton />
			) : (
				<>
					{isEmpty(allOrgsResponse.data?.organizers || []) ? (
						<EmptyOrgs />
					) : (
						<SimpleGrid cols={3}>
							{allOrgsResponse?.data?.organizers.map(
								({ id, email_address, name, is_locked, is_active, logout_at }) => (
									<ItemOrganizer
										key={id}
										id={id}
										email={email_address}
										name={name}
										isLocked={is_locked}
										isActive={is_active}
										lastAccessedAt={logout_at}
									/>
								),
							)}
						</SimpleGrid>
					)}
				</>
			)}
		</Container>
	);
}
