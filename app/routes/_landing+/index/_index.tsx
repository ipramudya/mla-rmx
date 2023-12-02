import { Flex } from "@mantine/core";
import Banner from "./components/Banner";
import Filters from "./components/Filters";
import LombaList from "./components/LombaList/LombaList";

export default function LandingPage() {
	return (
		<Flex component="main" direction="column" gap={42}>
			<Banner />

			<Filters />

			<LombaList />
		</Flex>
	);
}
