import { Flex } from "@mantine/core";
import OrganizerChannels from "./OrganizerChannels";

export default function Sidebar() {
	return (
		<Flex component="aside" gap={8}>
			<OrganizerChannels />

			{/* sidenavs */}
		</Flex>
	);
}
