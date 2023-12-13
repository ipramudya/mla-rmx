import { Button, Group, Menu, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import useSortOrgs from "app/features/organizer/hooks/use-sort-orgs";
import { useMemo, useState } from "react";

type SORT_KEY = "reset" | "activity" | "total_event";

const REMAP_SORT_LABEL = new Map<SORT_KEY, string>([
	["reset", "Paling relevan"],
	["activity", "Baru diakses"],
	["total_event", "Lomba terbanyak"],
]);

const SORT_ITEMS = [
	{ key: "reset", label: "Paling relevan" },
	{ key: "activity", label: "Baru diakses" },
	{ key: "total_event", label: "Lomba terbanyak" },
] as const;

export default function Sort() {
	const [opened, setOpened] = useState(false);

	const { setSort, resetSort, sort } = useSortOrgs();

	const handleSelectMenu = (k: SORT_KEY) => {
		if (k === "reset") {
			resetSort();
			return;
		}

		setSort({ [k]: "asc" });
	};

	const sortedKey = useMemo(() => {
		if (!sort) return "reset";

		return Object.keys(sort)[0] as SORT_KEY;
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
						{REMAP_SORT_LABEL.get(sortedKey)}
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Label>urut berdasarkan</Menu.Label>
					{SORT_ITEMS.map(({ key, label }) => (
						<Menu.Item
							key={"sort item " + key}
							onClick={() => handleSelectMenu(key)}
							rightSection={sortedKey === key ? <Icon.Check /> : undefined}
						>
							{label}
						</Menu.Item>
					))}
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}
