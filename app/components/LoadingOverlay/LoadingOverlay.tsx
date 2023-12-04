import { Loader, Overlay } from "@mantine/core";
import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay({ visible }: { visible: boolean }) {
	return !visible ? (
		false
	) : (
		<Overlay
			gradient="linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)"
			opacity={0.5}
		>
			<Loader color="indigo" size={24} className={styles.loader} />
		</Overlay>
	);
}
