import { Stack } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import getOrganizerAccounts, {
	GET_ORGANIZER_ACCOUNTS_QUERY_KEY,
} from "app/modules/organizer/api/get-organizers-accounts";
import Header from "app/modules/organizer/components/ChooseOrganizer/Header";
import Heading from "app/modules/organizer/components/ChooseOrganizer/Heading";
import ListOrganizer from "app/modules/organizer/components/ChooseOrganizer/ListOrganizer";
import LoginPopup from "app/modules/organizer/components/ChooseOrganizer/LoginPopup";
import Panel from "app/modules/organizer/components/ChooseOrganizer/Panel";
import DashboardLayoutSkeleton from "app/modules/organizer/components/Dashboard/Layout/Skeleton";
import { Provider } from "jotai";

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
	const navigation = useNavigation();

	return navigation.state === "loading" ? (
		<DashboardLayoutSkeleton />
	) : (
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
