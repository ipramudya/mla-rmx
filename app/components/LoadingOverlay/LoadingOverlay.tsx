import { Loader, Overlay, Portal } from "@mantine/core";
import styles from "./LoadingOverlay.module.css";

interface Props {
	fillWindow?: boolean;
	visible: boolean;
}

const Z_INDEX = 1_000;

export default function LoadingOverlay({ visible, fillWindow }: Props) {
	return !visible ? (
		false
	) : (
		<Portal>
			<Overlay
				id="loading_overlay"
				gradient="linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)"
				opacity={0.5}
				style={fillWindow ? { position: "fixed", zIndex: Z_INDEX } : undefined}
			>
				<Loader color="indigo" size={24} className={styles.loader} />
			</Overlay>
		</Portal>
	);
}
