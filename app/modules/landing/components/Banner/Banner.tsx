import { Box, Center, Container, Image } from "@mantine/core";
import { BannerImg } from "app/assets/images";
import styles from "./banner.module.css";

export default function Banner() {
	return (
		<Box className={styles.banner_wrapper}>
			<Box
				className={styles.banner_background}
				style={{
					backgroundImage: "url(./banner1.png)",
					// backgroundImage: "url(./https://placehold.co/600x400?text=Placeholder)",
				}}
			/>
			<Container size="xl" pos="relative" style={{ zIndex: 10 }} mt={32}>
				<Center>
					<Image radius="md" fit="cover" src={BannerImg} style={{ flex: "unset" }} />
				</Center>
			</Container>
		</Box>
	);
}
