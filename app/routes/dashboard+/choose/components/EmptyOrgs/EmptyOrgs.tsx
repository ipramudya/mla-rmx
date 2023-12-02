import { Center, Container, Stack, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import styles from "./EmptyOrgs.module.css";

export default function EmptyOrgs() {
	return (
		<Container size="lg" w="100%">
			<Stack align="center">
				<Center className={styles.icon} w={58} h={58}>
					<Icon.Organizer size={24} />
				</Center>
				<div style={{ textAlign: "center" }}>
					<Text fw={600} mb={2}>
						Organizer Kosong
					</Text>
					<Text variant="body-text" size="sm" maw={400}>
						Jika anda ingin mengadakan perlombaan, harap membuat akun organizer terlebih
						dahulu.
					</Text>
				</div>
			</Stack>
		</Container>
	);
}
