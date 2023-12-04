import { Button, Group, Menu, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import { useEffect, useMemo, useState } from "react";
import useSortOrgs from "./use-sort-orgs";

const REMAP_SORT_LABEL = new Map([
	["reset", "Paling relevan"],
	["logout_at", "Baru diakses"],
	["total_event", "Lomba terbanyak"],
]);

const SORT_ITEMS = [
	{ key: "reset", label: "Paling relevan" },
	{ key: "logout_at", label: "Baru diakses" },
	{ key: "total_event", label: "Lomba terbanyak" },
];

export default function Sort() {
	const [opened, setOpened] = useState(false);
	const { setSort, resetSort, sort } = useSortOrgs();

	const handleSelectMenu = (k: string) => {
		if (k === "reset") {
			resetSort();
			return;
		}

		setSort({ [k]: "asc" });
	};

	useEffect(
		() => () => {
			resetSort();
		},
		[resetSort],
	);

	const sortKey = useMemo(() => {
		if (!sort) return "reset";

		return Object.keys(sort)[0];
	}, [sort]);

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
						{REMAP_SORT_LABEL.get(sortKey)}
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Label>urut berdasarkan</Menu.Label>
					{SORT_ITEMS.map(({ key, label }) => (
						<Menu.Item
							key={"sort item " + key}
							onClick={() => handleSelectMenu(key)}
							rightSection={sortKey === key ? <Icon.Check /> : undefined}
						>
							{label}
						</Menu.Item>
					))}
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}
