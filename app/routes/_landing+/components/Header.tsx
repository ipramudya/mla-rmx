import { Box, Button, Container, Divider, Flex, Group, Text, Title, rgba } from "@mantine/core";
import A from "app/components/A";
import Search from "./Search";

export default function Header() {
	return (
		<Container size="xl">
			<Flex h="69px" pos="relative" justify="space-between" align="center">
				{/* logo + links */}
				<Group>
					{/* logo */}
					<Title fz={24} c="#fff">
						mulai
						<Text fz={24} component="span">
							lomba
						</Text>
					</Title>
					<Divider orientation="vertical" />

					{/* links */}
					<Group gap="lg">
						<A to="lomba" textProps={{ fw: "bold" }}>
							Lomba
						</A>
						<A to="organizer">Organizer</A>
					</Group>
				</Group>

				{/* main search */}
				<Box pos="absolute" inset={0} maw="fit-content" h="fit-content" m="auto">
					<Search />
				</Box>

				{/* create lomba + entry/profile */}
				<Group>
					<Group gap="lg">
						<A to="auth/login">Masuk</A>
						<A to="auth/register">Daftar</A>
					</Group>
					<Divider orientation="vertical" />
					<Button
						style={{
							border: "none",
							background: rgba("#fff", 0.5),
							color: "white",
						}}
						size="md"
					>
						Buat Lomba
					</Button>
				</Group>
			</Flex>
		</Container>
	);
}
