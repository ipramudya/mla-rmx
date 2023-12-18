import { Box, Button, Center, Stack, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import { ErrorDoodle } from "app/assets/images";
import styles from "./404.module.css";

interface Props {
	fallbackUrl: string;
}

export default function Simple404({ fallbackUrl }: Props) {
	return (
		<Center
			w="100%"
			h="100%"
			id="simple-404"
			component="section"
			style={{ position: "absolute" }}
		>
			<Stack gap="xl" align="center">
				<Box className={styles.img_wrapper} w={248}>
					<img className={styles.img} src={ErrorDoodle} alt="error-doodle" />
				</Box>
				<Stack gap={0} ta="center">
					<Text size="xl">Halaman tidak tersedia</Text>
					<Text className={styles.subtitle} variant="body-text">
						Mohon maaf, halaman yang anda kunjungi tidak dapat kami temukan :)
					</Text>
				</Stack>
				<Button component={Link} to={fallbackUrl}>
					Kembali
				</Button>
			</Stack>
		</Center>
	);
}
