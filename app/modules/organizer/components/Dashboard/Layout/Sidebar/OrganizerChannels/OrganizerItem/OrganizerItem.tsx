import { Avatar, Box, Center, HoverCard, Text } from "@mantine/core";
import { useAsyncValue } from "@remix-run/react";
import type { OrganizerAccounts } from "app/modules/organizer/types/organizer-accounts";
import type { LoaderData } from "app/routes/dashboard+/$organizer_id+/_layout";
import clsx from "clsx";
import { useMemo } from "react";
import styles from "./OrganizerItem.module.css";

interface Props {
	organizer: OrganizerAccounts;
}

export default function OrganizerItem({ organizer }: Props) {
	const asyncValue = useAsyncValue() as LoaderData;

	const isActive = useMemo(() => {
		if (organizer.id === asyncValue.data?.organizer.id) {
			return true;
		}

		return false;
	}, [asyncValue.data?.organizer.id, organizer.id]);

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
