import { Divider, Flex, Group, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import Notification from "./Notification";
import Profile from "./Profile";

export default function Topbar() {
	return (
		<Flex
			px={24}
			bg="white"
			align="center"
			justify="space-between"
			mih={70}
			style={{ borderRadius: "10px" }}
		>
			{/* logo */}
			<Text component="h1">
				<Flex
					component={Link}
					to="/dashboard/current-orgs-id"
					align="center"
					gap="sm"
					td="none"
				>
					<Text component="span" fz={22} c="black" fw={600}>
						mulai
						<Text fz={22} component="span">
							lomba
						</Text>
					</Text>
					<Divider
						orientation="vertical"
						style={{ borderColor: "var(--mantine-color-gray-3)" }}
					/>
					<Text component="span" fz={20} c="indigo" tt="uppercase">
						organizer
					</Text>
				</Flex>
			</Text>

			{/* topbar controls */}
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
