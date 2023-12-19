import { Avatar, Box, Center, HoverCard, Text } from "@mantine/core";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import type { OrganizerAccounts } from "app/modules/organizer/types/organizer-accounts";
import clsx from "clsx";
import { useMemo } from "react";
import styles from "./OrganizerItem.module.css";

interface Props {
	organizer: OrganizerAccounts;
}

export default function OrganizerItem({ organizer }: Props) {
	const currentOrganizer = useOrganizer((s) => s.organizerData);

	const isActive = useMemo(() => {
		if (currentOrganizer && organizer.id === currentOrganizer.id) {
			return true;
		}

		return false;
	}, [currentOrganizer, organizer.id]);

	return (
		<HoverCard position="right" width={240} shadow="md">
			<HoverCard.Target>
				<Center className={clsx(styles.wrapper, isActive ? styles.active : "")}>
					{isActive && <Box className={styles.indicator} />}
					{organizer.profile.secureUrl && (
						<Avatar size="sm" src={organizer.profile.secureUrl} />
					)}
				</Center>
			</HoverCard.Target>

			<HoverCard.Dropdown>
				<Text size="sm" fw={600}>
					{organizer.name}
				</Text>
				<Text size="xs" variant="body-text">
					{organizer.email_address}
				</Text>
			</HoverCard.Dropdown>
		</HoverCard>
	);
}
