import { Stack } from "@mantine/core";
import Header from "./components/Header";
import Heading from "./components/Heading";
import ListOrganizer from "./components/ListOrganizer";
import Search from "./components/Search";

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
