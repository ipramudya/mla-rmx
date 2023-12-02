import { Avatar, Badge, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { BannerOrganizer1, OrganizerAvatar } from "app/assets/images";
import { dateToWords } from "app/functions/date";
import styles from "./ItemOrganizer.module.css";
import ItemOrganizerMenu from "./ItemOrganizerMenu";

interface Props {
	isLocked: boolean;
	email: string;
	name: string;
	isActive: boolean;
	lastAccessedAt: number | null;
}

export default function ItemOrganizer({ name, email, isLocked, isActive, lastAccessedAt }: Props) {
	return (
		<Flex gap="md" direction="column" p={12} className={styles.root}>
			<Image src={BannerOrganizer1} radius="sm" className={styles.banner} />

			<Stack px={8}>
				<Group justify="space-between">
					<Avatar src={OrganizerAvatar} />
					<Group gap={2}>
						{!isActive && (
							<Badge size="sm" color="red" variant="light">
								Innactive
							</Badge>
						)}
						{isLocked && (
							<Badge size="sm" color="indigo" variant="light">
								Private
							</Badge>
						)}
						<ItemOrganizerMenu />
					</Group>
				</Group>

				<Stack gap={0}>
					<Text fw={600}>{name}</Text>
					<Text variant="body-text" size="sm">
						{email}
					</Text>
				</Stack>

				<Group gap="sm">
					<Text variant="body-text" size="sm">
						Tidak ada lomba
					</Text>
					<span style={{ color: "var(--mantine-color-gray-3)" }}>&#8226;</span>
					<Text variant="body-text" size="sm">
						{lastAccessedAt
							? `Diakses ${dateToWords(lastAccessedAt)}`
							: "Belum pernah diakses"}
					</Text>
				</Group>
			</Stack>
		</Flex>
	);
}
