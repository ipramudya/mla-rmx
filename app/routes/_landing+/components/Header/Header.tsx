import { Box, Button, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import useUser from "app/lib/store/hooks/use-user";
import useHeader from "app/routes/_landing+/components/Header/use-header";
import HeaderLink from "../HeaderLink";
import Profile from "../Profile";
import Search from "../Search";
import styles from "./Header.module.css";

export default function Header() {
	const { isScrolledOver } = useHeader();
	const user = useUser((s) => s.userData);
	const isLoggedIn = Boolean(user);

	return (
		<Container size="xl">
			<Flex h="69px" pos="relative" justify="space-between" align="center">
				{/* logo + links */}
				<Group>
					{/* logo */}
					<Link to="/" style={{ textDecoration: "none" }}>
						<Title fz={24} c={isScrolledOver ? "black" : "#fff"}>
							mulai
							<Text fz={24} component="span">
								lomba
							</Text>
						</Title>
					</Link>
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
					{!isLoggedIn ? (
						<>
							<Group gap="lg">
								<HeaderLink to="auth/login">Masuk</HeaderLink>
								<HeaderLink to="auth/register">Daftar</HeaderLink>
							</Group>
							<Divider orientation="vertical" />
						</>
					) : (
						<Profile isScrolledOver={isScrolledOver} />
					)}
					<Button
						classNames={{ root: isScrolledOver ? undefined : styles.create_lomba_btn }}
						variant={isScrolledOver ? "gradient" : "default"}
					>
						Buat Lomba
					</Button>
				</Group>
			</Flex>
		</Container>
	);
}
