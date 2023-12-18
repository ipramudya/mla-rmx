import { Box, Flex } from "@mantine/core";
import type { PropsWithChildren } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "./Base.module.css";

export default function Base({ children }: PropsWithChildren) {
	return (
		<Box className={styles.base}>
			<Flex className={styles.inner_base}>
				<Topbar />

				<Flex gap={8} h="100%">
					<Sidebar />

					<Flex component="main">{children}</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}
