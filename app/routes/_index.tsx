import { Box, Button, Input, Text } from "@mantine/core";

export default function Index() {
	return (
		<Box px={12} py={12}>
			<Text component="span" fz="md" mr={12}>
				hello world
			</Text>
			<Input />
			<Button variant="gradient">Helloo</Button>
		</Box>
	);
}
