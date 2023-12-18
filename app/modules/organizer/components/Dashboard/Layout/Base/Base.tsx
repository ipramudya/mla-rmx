import { Box, Flex, ScrollArea } from "@mantine/core";
import type { PropsWithChildren } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "./Base.module.css";

export default function Base({ children }: PropsWithChildren) {
	return (
		<Box className={styles.base}>
			<Flex className={styles.inner_base}>
				<Topbar />

				<Box className={styles.main_wrapper}>
					<Sidebar />

					<Flex component="section" className={styles.content_section}>
						<ScrollArea
							className={styles.scrollarea}
							styles={{
								thumb: { backgroundColor: "var(--mantine-color-gray-3)" },
							}}
						>
							{children}
						</ScrollArea>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}
