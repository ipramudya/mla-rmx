import { Divider, Flex, Group } from "@mantine/core";
import Notification from "./Notification";
import OrganizerLogo from "./OrganizerLogo";
import Profile from "./Profile";

export default function Topbar() {
	return (
		<Flex
			component="header"
			px={24}
			bg="white"
			align="center"
			justify="space-between"
			mih={70}
			style={{ borderRadius: "10px" }}
		>
			<OrganizerLogo />

			{/* topbar right controls */}
			<Group gap="md">
				<Notification />
				<Divider
					orientation="vertical"
					style={{ borderColor: "var(--mantine-color-gray-3)" }}
				/>
				<Profile />
			</Group>
		</Flex>
	);
}
