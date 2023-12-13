import { Avatar, Badge, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import LoadingOverlay from "app/components/LoadingOverlay";
import loginOrganizer from "app/features/organizer/api/login-organizer";
import usePopupLogin from "app/features/organizer/hooks/use-popup-login";
import { dateToWords } from "app/functions/date";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import { useState } from "react";
import { toast } from "sonner";
import styles from "./ItemOrganizer.module.css";
import ItemOrganizerMenu from "./ItemOrganizerMenu";

interface Props {
	id: string;
	isLocked: boolean;
	email: string;
	name: string;
	isActive: boolean;
	lastAccessedAt: number | null;
	totalLomba: number;
	profileImg: string;
	backgroundImg: string;
}

export default function ItemOrganizer({
	id,
	name,
	email,
	isLocked,
	isActive,
	lastAccessedAt,
	totalLomba,
	profileImg,
	backgroundImg,
}: Props) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setPopup } = usePopupLogin();
	const { setCurrentOrgs } = useOrganizer();

	const handleClick = async () => {
		if (isLocked) {
			setPopup({ id, show: true, name });
			return;
		}

		setLoading(true);

		const { error, data } = await loginOrganizer({ organizerId: id });

		if (error && !data) {
			toast.error("Error", {
				description: "Gagal masuk ke dalam dashboard",
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
				<Image src={backgroundImg} radius="sm" className={styles.banner} />

				<Stack px={8}>
					<Group justify="space-between">
						<Avatar src={profileImg} />
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
							<ItemOrganizerMenu id={id} />
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
							{!totalLomba
								? "Tidak ada lomba"
								: `${totalLomba} lomba diselenggarakan`}
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
