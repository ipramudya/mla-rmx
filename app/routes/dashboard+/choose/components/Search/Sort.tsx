import { Button, Group, Menu, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import { useState } from "react";

export default function Sort() {
	const [opened, setOpened] = useState(false);

	return (
		<Group>
			<Text size="sm" variant="body-text">
				sort by
			</Text>

			<Menu width={200} position="bottom-end" opened={opened} onChange={setOpened}>
				<Menu.Target>
					<Button
						component="div"
						role="button"
						variant="transparent"
						px={0}
						rightSection={
							<Icon.ChevDown
								size={16}
								style={{
									rotate: opened ? "-180deg" : "unset",
									transition: "all .3s ease",
								}}
							/>
						}
					>
						Baru diakses
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Label>urut berdasarkan</Menu.Label>
					<Menu.Item>Baru diakses</Menu.Item>
					<Menu.Item>Lomba terbanyak</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}
