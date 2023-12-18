import { Box, Flex } from "@mantine/core";
import BottomSidebar from "./BottomSidebar";
import OrganizerChannels from "./OrganizerChannels";
import styles from "./Sidebar.module.css";
import Sidenavs from "./Sidenavs";

export default function Sidebar() {
	return (
		<Box component="aside" className={styles.aside}>
			<Flex gap={8} style={{ flexGrow: 1 }}>
				<OrganizerChannels />

				<Sidenavs />
			</Flex>

			{/* bottom nav */}
			<BottomSidebar />
		</Box>
	);
}
