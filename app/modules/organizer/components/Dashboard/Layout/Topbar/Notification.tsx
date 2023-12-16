import { ActionIcon } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function Notification() {
	return (
		<ActionIcon w={36} h={36} variant="subtle" color="gray">
			<Icon.Bell size={20} />
		</ActionIcon>
	);
}
