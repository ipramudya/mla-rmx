import { Container, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import getOrganizerAccounts, {
	GET_ORGANIZER_ACCOUNTS_QUERY_KEY,
} from "../../api-organizers-accounts";
import ItemOrganizer from "./ItemOrganizer";

export default function ListOrganizer() {
	const { data: allOrgsResponse } = useQuery({
		queryKey: [GET_ORGANIZER_ACCOUNTS_QUERY_KEY],
		queryFn: async () => await getOrganizerAccounts(),
	});

	return (
		<Container size="lg" w="100%">
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
		</Container>
	);
}
