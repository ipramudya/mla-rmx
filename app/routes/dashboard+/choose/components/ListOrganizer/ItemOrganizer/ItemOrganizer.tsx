import { Avatar, Badge, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { BannerOrganizer1, OrganizerAvatar } from "app/assets/images";
import { dateToWords } from "app/functions/date";
import { type MouseEvent } from "react";
import usePopupLogin from "../../../use-popup-login";
import styles from "./ItemOrganizer.module.css";
import ItemOrganizerMenu from "./ItemOrganizerMenu";

interface Props {
	id: string;
	isLocked: boolean;
	email: string;
	name: string;
	isActive: boolean;
	lastAccessedAt: number | null;
}

export default function ItemOrganizer({
	id,
	name,
	email,
	isLocked,
	isActive,
	lastAccessedAt,
}: Props) {
	// const [loading, setLoading] = useState(false)
	const { setPopup } = usePopupLogin();

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (isLocked) {
			setPopup({ id, show: true, name });
			return;
		}
	};

	return (
		<Flex gap="md" direction="column" p={12} className={styles.root} onClick={handleClick}>
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
