import { Box, Center, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { PropsWithChildren } from "react";

export default function CreateOrganizerLayout({ children }: PropsWithChildren) {
	return (
		<Center bg="gray.0" miw="100%" mih="100dvh" pos="relative">
			<Box
				component={Link}
				to="/dashboard/choose"
				pos="absolute"
				left="50%"
				top="1rem"
				style={{ textDecoration: "none", transform: "translateX(-50%)" }}
			>
				{/* Logo */}
				<Group gap={8} align="center" justify="center">
					<Title fz={20} c="black">
						mulai
						<Text fz={20} component="span">
							lomba
						</Text>
					</Title>
					<Divider orientation="vertical" />
					<Text fz={20} component="span" tt="uppercase" variant="gradient" fw={600}>
						organizer
					</Text>
				</Group>
			</Box>
			<Stack
				p="xl"
				bg="white"
				gap="xl"
				w={{ lg: 500 }}
				maw={{ base: 342, lg: "100%" }}
				style={{
					border: "1px dashed var(--mantine-color-gray-3)",
					borderRadius: "var(--mantine-radius-lg)",
				}}
			>
				{children}
			</Stack>
		</Center>
	);
}
