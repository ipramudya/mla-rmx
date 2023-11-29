import { Button } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function LogoutButton() {
	return (
		<Button fullWidth rightSection={<Icon.Logout size={18} />} variant="outline" color="red">
			Keluar
		</Button>
	);
}
