import { Flex } from "@mantine/core";
import Banner from "app/modules/landing/components/Banner";
import Filters from "app/modules/landing/components/Filters";
import LombaList from "app/modules/landing/components/LombaLists";

export default function LandingPage() {
	return (
		<Flex component="main" direction="column">
			<Banner />

			<Flex component="section" bg="white" py={24} direction="column" gap={24}>
				<Filters />

				<LombaList />
			</Flex>
		</Flex>
	);
}
