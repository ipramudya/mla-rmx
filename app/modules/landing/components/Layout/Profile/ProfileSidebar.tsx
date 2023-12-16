import type { DrawerProps } from "@mantine/core";
import {
	Center,
	CloseButton,
	Divider,
	Drawer,
	Flex,
	Group,
	Image,
	ScrollArea,
	Stack,
	Text,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import { AddLombaSignature } from "app/assets/images";
import { Icon } from "app/components/Icon";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import LogoutButton from "./LogoutButton";
import styles from "./Profile.module.css";

interface Props extends Omit<DrawerProps, "children"> {
	userFullName?: string;
}

export default function ProfileSidebar({ opened, onClose, userFullName }: Props) {
	const currentOrgs = useOrganizer((s) => s.organizerData);

	const getCreateLombaDestinationURL = () => {
		return currentOrgs ? `/dashboard/${currentOrgs.id}` : "/dashboard/choose";
	};

	return (
		<Drawer
			position="right"
			opened={opened}
			onClose={onClose}
			withCloseButton={false}
			scrollAreaComponent={ScrollArea.Autosize}
			styles={{}}
		>
			<Stack gap="md">
				{/* header */}
				<Flex align="center" pos="relative">
					<div>
						<Text component="h4" size="lg" fw="600">
							Informasi Akun
						</Text>
						<Text component="p" size="sm" variant="body-text">
							Segala informasi mengenai data kamu
						</Text>
					</div>
					<CloseButton
						pos="absolute"
						right={4}
						variant="subtle"
						size="sm"
						onClick={onClose}
					/>
				</Flex>
				<Divider orientation="horizontal" ml={-16} mr={-16} />
				<Flex align="center" gap="sm">
					<Center
						w="40px"
						h="40px"
						bg="gray.1"
						style={{ borderRadius: "var(--mantine-radius-md)" }}
					>
						<Icon.User size={20} />
					</Center>
					<div>
						<Text component="h4" fw="600">
							Halo, {userFullName || "-"}!
						</Text>
						<Text component="p" size="sm" variant="body-text">
							Lihat dan ubah profile
						</Text>
					</div>
				</Flex>
				<Flex
					component={Link}
					prefetch="intent"
					to={getCreateLombaDestinationURL()}
					align="center"
					justify="space-between"
					gap="sm"
					className={styles.to_dashboard_btn}
				>
					<div>
						<Text component="h4" fw="600" variant="gradient">
							Buat Lomba
						</Text>
						<Text component="p" size="sm" variant="body-text">
							Jadi organizer dan adakan perlombaan, lalu temukan kandidat unggulan
						</Text>
					</div>
					<Image src={AddLombaSignature} w="56px" h="56px" fit="contain" />
				</Flex>
				<Stack gap="sm">
					<Text component="h4" fw={600}>
						Kelola Informasi Pengguna
					</Text>
					<Group gap="sm">
						<Icon.UserSquare size={20} />
						<Text variant="body-text">Informasi pribadi</Text>
					</Group>
					<Group gap="sm">
						<Icon.Gear size={20} />
						<Text variant="body-text">Pengaturan akun</Text>
					</Group>
					<Group c="dark.2" gap="sm">
						<Icon.Finance size={20} />
						<Text variant="body-text" c="dark.1">
							Keuangan{" "}
							<span style={{ fontSize: "var(--mantine-font-size-xs)" }}>
								(segera hadir)
							</span>
						</Text>
					</Group>
				</Stack>
				<Divider
					orientation="horizontal"
					variant="dashed"
					style={{ borderColor: "var(--mantine-color-gray-3)" }}
				/>
				<Stack gap="sm">
					<Text component="h4" fw={600}>
						Minat & Ketertarikan
					</Text>
					<Group gap="sm">
						<Icon.FollowedLomba size={20} />
						<Text variant="body-text">Lomba diikuti</Text>
					</Group>
					<Group gap="sm">
						<Icon.Certificate size={20} />
						<Text variant="body-text">Sertifikat pencapaian</Text>
					</Group>
					<Group gap="sm">
						<Icon.Heart size={20} />
						<Text variant="body-text">Wishlist</Text>
					</Group>
					<Group gap="sm">
						<Icon.LovedOrganizer size={20} />
						<Text variant="body-text">Organizer disukai</Text>
					</Group>
				</Stack>
				<Divider
					orientation="horizontal"
					variant="dashed"
					style={{ borderColor: "var(--mantine-color-gray-3)" }}
				/>
				<Stack gap="sm">
					<Text component="h4" fw={600}>
						Riwayat Pencarian
					</Text>
					<Group gap="sm">
						<Icon.History size={20} />
						<Text variant="body-text">Riwayat pencarian</Text>
					</Group>
					<Group gap="sm">
						<Icon.Reveal size={20} />
						<Text variant="body-text">Baru saja dilihat</Text>
					</Group>
				</Stack>
				<Divider
					orientation="horizontal"
					variant="dashed"
					style={{ borderColor: "var(--mantine-color-gray-3)" }}
				/>
				<Stack gap="sm">
					<Text component="h4" fw={600}>
						Bantuan & Dukungan
					</Text>
					<Group gap="sm">
						<Icon.Help size={20} />
						<Text variant="body-text">Pusat bantuan dan kebijakan</Text>
					</Group>
					<Group gap="sm">
						<Icon.Info size={20} />
						<Text variant="body-text">Tentang MulaiLomba</Text>
					</Group>
					<Group gap="sm">
						<Icon.Feedback size={20} />
						<Text variant="body-text">Saran dan masukan</Text>
					</Group>
				</Stack>
				<LogoutButton />
			</Stack>
		</Drawer>
	);
}
