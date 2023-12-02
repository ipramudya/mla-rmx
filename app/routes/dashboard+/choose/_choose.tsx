import { Stack } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import getOrganizerAccounts, { GET_ORGANIZER_ACCOUNTS_QUERY_KEY } from "./api-organizers-accounts";
import Header from "./components/Header";
import Heading from "./components/Heading";
import ListOrganizer from "./components/ListOrganizer";
import Search from "./components/Search";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: [GET_ORGANIZER_ACCOUNTS_QUERY_KEY],
		queryFn: () => getOrganizerAccounts(cookieHeader ?? undefined),
	});

	return json(
		{ dehydratedState: dehydrate(queryClient) },
		{
			headers: {
				"Cache-Control": "private, max-age=60",
			},
		},
	);
}

export default function ChoosePage() {
	return (
		<Stack gap="xl" pb={100}>
			<Header />

			<Heading />

			<Search />

			{/* <EmptyOrgs /> */}
			<ListOrganizer />
		</Stack>
	);
}
