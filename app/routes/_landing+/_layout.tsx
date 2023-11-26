import { Box, Button, Container, Flex, Group, Text, Title } from "@mantine/core";
import { Outlet } from "@remix-run/react";
import A from "app/components/a";
import Search from "app/components/search";

export default function LandingLayoyt() {
	return (
		<>
			<Box style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }} bg="#ffffff">
				{/* header */}
				<Container pos="sticky" top={0} size="xl">
					<Flex h="69px" pos="relative" justify="space-between" align="center">
						{/* logo + links */}
						<Group gap="lg">
							{/* logo */}
							<Title fz={24}>
								mulai
								<Text fz={24} component="span">
									lomba
								</Text>
							</Title>
							{/* links */}
							<A to="lomba" textProps={{ fw: "bold", c: "indigo.5" }}>
								Lomba
							</A>
							<A to="organizer">Organizer</A>
						</Group>

						{/* main search */}
						<Box pos="absolute" inset={0} maw="fit-content" h="fit-content" m="auto">
							<Search />
						</Box>

						{/* create lomba + entry/profile */}
						<Group gap="lg">
							<A to="auth/login">Masuk</A>
							<A to="auth/register">Daftar</A>
							<Button variant="gradient">Buat Lomba</Button>
						</Group>
					</Flex>
				</Container>
			</Box>
			<Outlet />
		</>
	);
}
