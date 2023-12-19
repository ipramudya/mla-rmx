import { Button, Container, Divider, SimpleGrid, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import useListOrganizers from "app/modules/organizer/hooks/use-list-organizers";
import type { OrganizerAccounts } from "app/modules/organizer/types/organizer-accounts";
import { useMemo } from "react";
import { groupBy, isEmpty } from "remeda";
import EmptyOrgs from "../EmptyOrgs";
import ItemOrganizer from "./ItemOrganizer";
import ListOrganizerSkeleton from "./ListOrganizerSkeleton";

export default function ListOrganizer() {
	const [isFavoriteShown, { toggle }] = useDisclosure();
	const { allOrgsResponse, isLoading } = useListOrganizers();

	const splitOrgsByFavorites = useMemo(() => {
		if (allOrgsResponse && allOrgsResponse.data && allOrgsResponse.data.organizers) {
			return groupBy(allOrgsResponse.data.organizers, (x) =>
				x.is_favorite ? "favorite" : "general",
			);
		}

		return null;
	}, [allOrgsResponse]);

	return (
		<Container mih="80vh" size="lg" w="100%">
			{allOrgsResponse === undefined || splitOrgsByFavorites === null || isLoading ? (
				<ListOrganizerSkeleton />
			) : (
				<>
					{isEmpty(allOrgsResponse.data?.organizers || []) ? (
						<EmptyOrgs />
					) : (
						<Stack gap="lg">
							{splitOrgsByFavorites.favorite && (
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
										Favorit anda
									</Button>

									{isFavoriteShown && (
										<>
											<OrganizerGrid
												organizers={splitOrgsByFavorites.favorite}
											/>
											<Divider />
										</>
									)}
								</Stack>
							)}

							<OrganizerGrid organizers={splitOrgsByFavorites.general} />
						</Stack>
					)}
				</>
			)}
		</Container>
	);
}

function OrganizerGrid({
	organizers,
}: { organizers: [OrganizerAccounts, ...OrganizerAccounts[]] }) {
	return (
		<SimpleGrid cols={3}>
			{organizers.map(
				(
					{
						email_address,
						name,
						total_event,
						is_locked,
						is_active,
						logout_at,
						id,
						background,
						profile,
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
						profileImg={profile?.secureUrl || ""}
						backgroundImg={background?.secureUrl || ""}
					/>
				),
			)}
		</SimpleGrid>
	);
}
