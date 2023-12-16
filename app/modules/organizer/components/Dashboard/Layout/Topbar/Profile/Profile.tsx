import { Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import ProfileSidebar from "./ProfileSidebar";

export default function Profile() {
	const [isOpen, { toggle, close }] = useDisclosure();

	return (
		<>
			<Button
				leftSection={<Icon.Menu color="var(--mantine-color-dark-3)" size={20} />}
				px={12}
				onClick={toggle}
			>
				<Box bg="indigo.7" w={20} h={20} style={{ borderRadius: "100px" }} />
			</Button>

			<ProfileSidebar opened={isOpen} onClose={close} />
		</>
	);
}
