import { Flex } from "@mantine/core";
import Banner from "app/features/landing/components/Banner";
import Filters from "app/features/landing/components/Filters";
import LombaList from "app/features/landing/components/LombaLists";

export default function LandingPage() {
	return (
		<Flex component="main" direction="column" gap={42}>
			<Banner />

			<Filters />

			<LombaList />
		</Flex>
	);
}
