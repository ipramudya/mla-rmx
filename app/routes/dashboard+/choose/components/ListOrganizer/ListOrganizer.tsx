import { Button, Container, SimpleGrid, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "app/components/Icon";
import { useMemo } from "react";
import { groupBy, isEmpty } from "remeda";
import getOrganizerAccounts, {
	GET_ORGANIZER_ACCOUNTS_QUERY_KEY,
} from "../../api-organizers-accounts";
import EmptyOrgs from "../EmptyOrgs";
import useSearchOrgs from "../Panel/Search/use-search-orgs";
import useSortOrgs from "../Panel/Sort/use-sort-orgs";
import ItemOrganizer from "./ItemOrganizer";
import ListOrganizerSkeleton from "./ListOrganizerSkeleton";

export default function ListOrganizer() {
	const [isFavoriteShown, { toggle }] = useDisclosure();
	const { search } = useSearchOrgs();
	const { sort } = useSortOrgs();

	const { data: allOrgsResponse, isLoading } = useQuery({
		queryKey: [
			!search && !sort
				? GET_ORGANIZER_ACCOUNTS_QUERY_KEY
				: [...GET_ORGANIZER_ACCOUNTS_QUERY_KEY, search, sort],
		],
		queryFn: async () => await getOrganizerAccounts({ search: { name: search }, sort }),
	});

	const splited = useMemo(() => {
		if (allOrgsResponse && allOrgsResponse.data && allOrgsResponse.data.organizers) {
			return groupBy(allOrgsResponse.data.organizers, (x) =>
				x.is_favorite ? "favorite" : "general",
			);
		}

		return null;
	}, [allOrgsResponse]);

	return (
		<Container mih="80vh" size="lg" w="100%">
			{allOrgsResponse === undefined || splited === null || isLoading ? (
				<ListOrganizerSkeleton />
			) : (
				<>
					{isEmpty(allOrgsResponse.data?.organizers || []) ? (
						<EmptyOrgs />
					) : (
						<Stack gap="lg">
							{splited.favorite && (
								<Stack>
									<Button
										ml={-18}
										maw="fit-content"
										variant="subtle"
										color="gray"
										onClick={toggle}
										rightSection={
											<Icon.ChevRight
												size={16}
												style={{
													rotate: isFavoriteShown ? "90deg" : "unset",
													transition: "all .3s ease",
												}}
											/>
										}
									>
										Lihat Favorite
									</Button>
									{isFavoriteShown && (
										<SimpleGrid cols={3}>
											{splited.favorite.map(
												(
													{
														email_address,
														name,
														total_event,
														is_locked,
														is_active,
														logout_at,
														id,
													},
													idx,
												) => (
													<ItemOrganizer
														key={id + idx}
														id={id}
														email={email_address}
														name={name}
														isLocked={is_locked}
														isActive={is_active}
														lastAccessedAt={logout_at}
														totalLomba={total_event}
													/>
												),
											)}
										</SimpleGrid>
									)}
								</Stack>
							)}

							<SimpleGrid cols={3}>
								{splited.general.map(
									(
										{
											email_address,
											name,
											total_event,
											is_locked,
											is_active,
											logout_at,
											id,
										},
										idx,
									) => (
										<ItemOrganizer
											key={id + idx}
											id={id}
											email={email_address}
											name={name}
											isLocked={is_locked}
											isActive={is_active}
											lastAccessedAt={logout_at}
											totalLomba={total_event}
										/>
									),
								)}
							</SimpleGrid>
						</Stack>
					)}
				</>
			)}
		</Container>
	);
}
