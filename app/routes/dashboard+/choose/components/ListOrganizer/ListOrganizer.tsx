import { Button, Container, Divider, SimpleGrid, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import { useMemo } from "react";
import { groupBy, isEmpty } from "remeda";
import EmptyOrgs from "../EmptyOrgs";
import ItemOrganizer from "./ItemOrganizer";
import ListOrganizerSkeleton from "./ListOrganizerSkeleton";
import useListOrganizers from "./use-list-organizers";

export default function ListOrganizer() {
	const [isFavoriteShown, { toggle }] = useDisclosure();
	const { allOrgsResponse, isLoading } = useListOrganizers();

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
										Favorit anda
									</Button>
									{isFavoriteShown && (
										<>
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
											<Divider />
										</>
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
