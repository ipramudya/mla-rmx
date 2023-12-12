import { Stack } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Provider } from "jotai";
import getOrganizerAccounts, { GET_ORGANIZER_ACCOUNTS_QUERY_KEY } from "./api-organizers-accounts";
import Header from "./components/Header";
import Heading from "./components/Heading";
import ListOrganizer from "./components/ListOrganizer";
import LoginPopup from "./components/LoginPopup";
import Panel from "./components/Panel";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const queryClient = new QueryClient();

	const cookie = cookieHeader ? { cookie: cookieHeader } : undefined;

	await queryClient.prefetchQuery({
		queryKey: [GET_ORGANIZER_ACCOUNTS_QUERY_KEY],
		queryFn: () => getOrganizerAccounts(undefined, cookie),
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
		<Provider>
			<LoginPopup />

			<Stack gap="xl" pb={100}>
				<Header />

				<Heading />

				<Panel />

				<ListOrganizer />
			</Stack>
		</Provider>
	);
}
