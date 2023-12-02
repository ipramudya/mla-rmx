import { Avatar, Badge, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { BannerOrganizer1, OrganizerAvatar } from "app/assets/images";
import styles from "./ItemOrganizer.module.css";
import ItemOrganizerMenu from "./ItemOrganizerMenu";

export default function ItemOrganizer() {
	return (
		<Flex gap="md" direction="column" p={12} className={styles.root}>
			<Image src={BannerOrganizer1} radius="sm" className={styles.banner} />

			<Stack px={8}>
				<Group justify="space-between">
					<Avatar src={OrganizerAvatar} />
					<Group gap={2}>
						<Badge size="sm" color="indigo" variant="light">
							Private
						</Badge>
						<ItemOrganizerMenu />
					</Group>
				</Group>

				<Stack gap={0}>
					<Text fw={600}>YourName</Text>
					<Text variant="body-text" size="sm">
						yourname@gmail.com
					</Text>
				</Stack>

				<Group gap="sm">
					<Text variant="body-text" size="sm">
						Tidak ada lomba
					</Text>
					<span style={{ color: "var(--mantine-color-gray-3)" }}>&#8226;</span>
					<Text variant="body-text" size="sm">
						Diakses 1 menit lalu
					</Text>
				</Group>
			</Stack>
		</Flex>
	);
}
