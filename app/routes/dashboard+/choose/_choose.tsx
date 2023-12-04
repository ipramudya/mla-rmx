import { Stack } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import getOrganizerAccounts, { GET_ORGANIZER_ACCOUNTS_QUERY_KEY } from "./api-organizers-accounts";
import Header from "./components/Header";
import Heading from "./components/Heading";
import ListOrganizer from "./components/ListOrganizer";
import LoginPopup from "./components/LoginPopup";
import Panel from "./components/Panel";
import usePopupLogin from "./use-popup-login";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: [GET_ORGANIZER_ACCOUNTS_QUERY_KEY],
		queryFn: () =>
			getOrganizerAccounts(undefined, cookieHeader ? { cookie: cookieHeader } : undefined),
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
	const { popup, resetPopup } = usePopupLogin();

	return (
		<>
			{popup.show && (
				<LoginPopup name={popup.name} opened={popup.show} onClose={() => resetPopup()} />
			)}

			<Stack gap="xl" pb={100}>
				<Header />

				<Heading />

				<Panel />

				<ListOrganizer />
			</Stack>
		</>
	);
}
