import { ActionIcon, Menu, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function ItemOrganizerMenu() {
	return (
		<Menu position="bottom-end" width={180} shadow="md">
			<Menu.Target>
				<ActionIcon variant="transparent" color="gray">
					<Icon.More size={16} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item rightSection={<Icon.Star size={14} />}>
					<Text size="sm">Tambahkan favorit</Text>
				</Menu.Item>
				<Menu.Item>
					<Text size="sm">Manage lomba</Text>
				</Menu.Item>
				<Menu.Item>
					<Text size="sm">Profil</Text>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
