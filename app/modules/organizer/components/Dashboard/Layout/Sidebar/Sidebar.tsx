import { Flex } from "@mantine/core";
import BottomSidebar from "./BottomSidebar";
import OrganizerChannels from "./OrganizerChannels";

export default function Sidebar() {
	return (
		<Flex component="aside" gap={8} direction="column">
			<Flex gap={8} style={{ flexGrow: 1 }}>
				<OrganizerChannels />

				{/* sidenavs */}
			</Flex>

			{/* bottom nav */}
			<BottomSidebar />
		</Flex>
	);
}
