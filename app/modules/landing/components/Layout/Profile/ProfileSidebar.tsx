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
import PROFILE_SIDEBAR_LINKS from "app/constant/profile-sidebar-links";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import { Fragment } from "react";
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
				{PROFILE_SIDEBAR_LINKS.map((link, idx) => (
					<Fragment key={"profile sidebar" + link.title + idx}>
						<Stack gap="sm">
							<Text component="h4" fw={600}>
								{link.title}
							</Text>
							{link.subtitles.map((subtitle, childIdx) => {
								const GeneratedIcon = Icon[subtitle.icon];

								return (
									<Group
										gap="sm"
										key={"profile sidebar subtitle " + link.title + childIdx}
									>
										<GeneratedIcon size={20} />
										{!subtitle.isDisabled ? (
											<Text variant="body-text">{subtitle.text}</Text>
										) : (
											<Text variant="body-text" c="dark.1">
												{subtitle.text}{" "}
												<span
													style={{
														fontSize: "var(--mantine-font-size-xs)",
													}}
												>
													(segera hadir)
												</span>
											</Text>
										)}
									</Group>
								);
							})}
						</Stack>
						{PROFILE_SIDEBAR_LINKS.length !== idx && (
							<Divider
								orientation="horizontal"
								variant="dashed"
								style={{ borderColor: "var(--mantine-color-gray-3)" }}
							/>
						)}
					</Fragment>
				))}
				<LogoutButton />
			</Stack>
		</Drawer>
	);
}
