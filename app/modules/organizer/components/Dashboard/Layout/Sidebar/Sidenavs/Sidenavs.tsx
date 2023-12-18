import { ActionIcon, Box, Button, Group, Stack, Text } from "@mantine/core";
import { Link, useAsyncValue, useLocation } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import SIDEBAR_MENU from "app/modules/organizer/utils/sidebar-menu";
import type { me } from "app/services/orgs-data-service";
import styles from "./Sidenavs.module.css";

export default function Sidenavs() {
	const { data } = useAsyncValue() as Awaited<ReturnType<typeof me>>;
	const { pathname } = useLocation();

	const handleCloseSidebar = () => {
		console.log("close sidebar");
	};

	const getIsNavActive = (url: string): boolean => {
		const pathnames = pathname.split("/").slice(3);

		if (url === "/" && pathnames.length === 0) return true;

		if (pathnames.includes(url)) return true;

		return false;
	};

	return (
		<Box className={styles.wrapper}>
			<Group justify="space-between" align="center">
				<Stack gap={0}>
					<Text size="xs" variant="body-text">
						Selamat Datang
					</Text>
					<Text size="xl" fw={600} component="h1">
						{data?.organizer.name || "-"}
					</Text>
				</Stack>
				<ActionIcon
					w={36}
					h={36}
					variant="subtle"
					color="gray"
					onClick={handleCloseSidebar}
				>
					<Icon.ChevDoubleRight size={20} />
				</ActionIcon>
			</Group>

			<Stack gap={12}>
				{SIDEBAR_MENU.map(({ label, icon, url }, idx) => {
					const GenerateIcon = Icon[icon];
					const isActive = getIsNavActive(url);

					return (
						<Button
							variant={isActive ? "light" : "subtle"}
							color={isActive ? "indigo" : "gray"}
							component={Link}
							to={`/dashboard/${data?.organizer.id}/${url}`}
							key={"sidebar nav " + idx}
							leftSection={<GenerateIcon size={20} />}
							classNames={{
								root: styles.nav_inner_btn,
								inner: styles.nav_inner_btn,
							}}
						>
							{label}
						</Button>
					);
				})}
			</Stack>
		</Box>
	);
}
