import { Box, Button, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import Profile from "app/routes/_landing+/components/Profile";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<Box component="header" className={styles.wrapper}>
			<Container size="lg">
				<Flex
					component="nav"
					pos="relative"
					justify="space-between"
					align="center"
					mih={70}
				>
					<Button
						variant="transparent"
						component={Link}
						to="/"
						px={0}
						m={0}
						leftSection={<Icon.ChevLeft size={16} />}
						color="gray"
					>
						Halaman utama
					</Button>

					{/* logo */}
					<Box
						component={Link}
						to="/"
						style={{ textDecoration: "none" }}
						className={styles.logo}
					>
						<Group gap={8} align="center" justify="center">
							<Title fz={20} c="black">
								mulai
								<Text fz={20} component="span">
									lomba
								</Text>
							</Title>
							{/* <span>|</span> */}
							<Divider orientation="vertical" />
							<Text
								fz={20}
								component="span"
								tt="uppercase"
								variant="gradient"
								fw={600}
							>
								organizer
							</Text>
						</Group>
					</Box>

					<Profile isScrolledOver />
				</Flex>
			</Container>
		</Box>
	);
}
