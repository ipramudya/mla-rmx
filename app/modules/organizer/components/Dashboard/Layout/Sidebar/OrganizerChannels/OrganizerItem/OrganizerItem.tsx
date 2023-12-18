import { Avatar, Center, HoverCard, Text } from "@mantine/core";
import type { OrganizerAccounts } from "app/modules/organizer/types/organizer-accounts";
import clsx from "clsx";
import styles from "./OrganizerItem.module.css";

interface Props {
	organizer: OrganizerAccounts;
	active?: boolean;
}

export default function OrganizerItem({ organizer, active }: Props) {
	return (
		<HoverCard position="right" width={240} shadow="md">
			<HoverCard.Target>
				<Center className={clsx(styles.wrapper, active ? styles.active : "")}>
					<Avatar src={organizer.profile.secureUrl} />
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
