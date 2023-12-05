import { ActionIcon, Menu, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Icon } from "app/components/Icon";
import { useMemo } from "react";
import useListOrganizers from "../use-list-organizers";
import favoriteOrgs from "./api-favorite";

interface Props {
	id: string;
}

export default function ItemOrganizerMenu({ id }: Props) {
	const { allOrgsResponse, refetch } = useListOrganizers();

	const currentOrgs = useMemo(() => {
		if (allOrgsResponse && allOrgsResponse.data && allOrgsResponse.data.organizers) {
			return allOrgsResponse.data.organizers.find((x) => x.id === id)?.is_favorite ?? false;
		}

		return null;
	}, [allOrgsResponse, id]);

	const handleFavoriteOrgs = async () => {
		if (currentOrgs !== null) {
			await favoriteOrgs(id, currentOrgs ? "remove" : "add");
			refetch();
			return;
		}

		showNotification({
			title: "Error",
			message: "Tidak dapat menambah/menghapus item dari favorite",
			color: "red",
		});
	};

	return (
		<Menu position="bottom-end" width={180} shadow="md">
			<Menu.Target>
				<ActionIcon
					variant="transparent"
					color="gray"
					pos="relative"
					style={{ zIndex: 10 }}
					onClick={(e) => e.stopPropagation()}
				>
					<Icon.More size={16} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					rightSection={
						<Icon.Star size={14} variant={currentOrgs ? "Bold" : "Outline"} />
					}
				>
					<Text
						size="sm"
						onClick={(e) => {
							e.stopPropagation();
							handleFavoriteOrgs();
						}}
					>
						{currentOrgs ? "Hapus favorite" : "Tambah Favorite"}
					</Text>
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
