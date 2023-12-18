import { Button, Stack } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function BottomSidebar() {
	const handleSwitchToHomesite = () => {
		console.log("switch to homesite");
	};

	const handleLogoutOrg = () => {
		console.log("logout orgs");
	};

	return (
		<Stack p={12} style={{ borderRadius: "10px" }} bg="white">
			<Button
				variant="subtle"
				color="gray"
				leftSection={<Icon.Back size={20} />}
				styles={{
					inner: {
						justifyContent: "start",
					},
				}}
				onClick={handleSwitchToHomesite}
			>
				Beralih ke Halaman Utama
			</Button>
			<Button
				variant="subtle"
				color="red"
				leftSection={<Icon.Logout size={20} />}
				styles={{
					section: { transform: "rotate(180deg)" },
					inner: { justifyContent: "start" },
				}}
				onClick={handleLogoutOrg}
			>
				Keluar Organizer
			</Button>
		</Stack>
	);
}
