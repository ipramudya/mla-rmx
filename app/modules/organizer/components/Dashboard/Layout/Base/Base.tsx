import { Box, Flex } from "@mantine/core";
import type { PropsWithChildren } from "react";
import Topbar from "../Topbar";
import styles from "./Base.module.css";

export default function Base({ children }: PropsWithChildren) {
	return (
		<Box className={styles.base}>
			<Flex className={styles.inner_base}>
				<Topbar />
				{children}
			</Flex>
		</Box>
	);
}
