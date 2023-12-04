import { Avatar, Badge, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "@remix-run/react";
import { BannerOrganizer1, OrganizerAvatar } from "app/assets/images";
import LoadingOverlay from "app/components/LoadingOverlay";
import { dateToWords } from "app/functions/date";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import { useState } from "react";
import loginOrganizer from "../../../api-login-organizer";
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
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setPopup } = usePopupLogin();
	const { setCurrentOrgs } = useOrganizer();

	const handleClick = async () => {
		setLoading(true);

		if (isLocked) {
			setPopup({ id, show: true, name });
			return;
		}

		const { error, data } = await loginOrganizer({ organizerId: id });

		if (error && !data) {
			showNotification({
				title: "Error",
				message: "Gagal masuk ke dalam dashboard",
				color: "red",
			});
		}

		if (data) {
			orgsClientSession.setAccessToken(data.access_token);
			setCurrentOrgs(data.identity);
			navigate(`/dashboard/${data.identity.username}`);
		}

		setLoading(false);
	};

	return (
		<>
			<LoadingOverlay visible={loading} />

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
		</>
	);
}
