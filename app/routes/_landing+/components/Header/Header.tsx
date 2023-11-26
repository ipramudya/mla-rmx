import { Box, Button, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import useHeader from "app/hooks/useHeader";
import HeaderLink from "../HeaderLink";
import Search from "../Search";
import styles from "./Header.module.css";

export default function Header() {
	const { isOver } = useHeader();

	return (
		<Container size="xl">
			<Flex h="69px" pos="relative" justify="space-between" align="center">
				{/* logo + links */}
				<Group>
					{/* logo */}
					<Title fz={24} c={isOver ? "black" : "#fff"}>
						mulai
						<Text fz={24} component="span">
							lomba
						</Text>
					</Title>
					<Divider orientation="vertical" />

					{/* links */}
					<Group gap="lg">
						<HeaderLink to="lomba">Lomba</HeaderLink>
						<HeaderLink to="organizer">Organizer</HeaderLink>
					</Group>
				</Group>

				{/* main search */}
				<Box pos="absolute" inset={0} maw="fit-content" h="fit-content" m="auto">
					<Search />
				</Box>

				{/* create lomba + entry/profile */}
				<Group>
					<Group gap="lg">
						<HeaderLink to="auth/login">Masuk</HeaderLink>
						<HeaderLink to="auth/register">Daftar</HeaderLink>
					</Group>
					<Divider orientation="vertical" />
					<Button
						classNames={{ root: isOver ? undefined : styles.create_lomba_btn }}
						variant={isOver ? "gradient" : "default"}
						size="md"
					>
						Buat Lomba
					</Button>
				</Group>
			</Flex>
		</Container>
	);
}
