import { Divider, Flex, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import useOrganizer from "app/lib/store/hooks/use-organizer";

export default function OrganizerLogo() {
	const currentOrgs = useOrganizer((s) => s.organizerData)!;

	return (
		<Text component="h1">
			<Flex
				component={Link}
				to={`/dashboard/${currentOrgs.id}`}
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
	);
}
