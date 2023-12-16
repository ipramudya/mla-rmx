import { Box, Button } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function Profile() {
	return (
		<Button
			// onClick={toggle}
			leftSection={<Icon.Menu color="var(--mantine-color-dark-3)" size={20} />}
			px={12}
		>
			<Box bg="indigo.7" w={20} h={20} style={{ borderRadius: "100px" }} />
		</Button>
	);
}
