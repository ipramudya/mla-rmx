import { Button, Container, Flex, Stack, Text, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import { Icon } from "app/components/Icon";

export default function Heading() {
	return (
		<Container size="lg" w="100%">
			<Flex component="section" align="center" justify="space-between">
				<Stack gap={0}>
					<Title order={2} size="h2" lh="md" fw={600}>
						Akun Organizer
					</Title>
					<Stack gap={0}>
						<Text>Buat organizer, masuk, lalu selenggarakan lomba terbaikmu.</Text>
					</Stack>
				</Stack>

				<Button
					component={Link}
					to="/dashboard/create"
					variant="gradient"
					rightSection={<Icon.Organizer size={20} variant="Bold" />}
				>
					Buat Organizer
				</Button>
			</Flex>
		</Container>
	);
}
