import { Box, Button, Divider, Flex, Space, TextInput } from "@mantine/core";
import { Icon } from "app/components/Icon";
import useHeader from "app/routes/_landing+/components/Header/use-header";
import styles from "./Search.module.css";

export default function Search() {
	const { isScrolledOver: isOver } = useHeader();

	return (
		<Box pos="relative" miw={{ md: 340, lg: 360, xl: 420 }}>
			<Flex pos="relative">
				<TextInput
					unstyled
					placeholder="Temukan sesuatu menarik..."
					w="100%"
					leftSection={
						<Icon.Search
							size={16}
							color={isOver ? "var(--mantine-color-black)" : "white"}
							variant="Outline"
						/>
					}
					classNames={{
						wrapper: isOver ? styles.input_wrapper_bordered : styles.input_wrapper,
						input: isOver ? styles.input_bordered : styles.input,
						section: styles.input_section,
					}}
					rightSection={
						<>
							<Divider orientation="vertical" />
							<Button
								px={0}
								pl={12}
								className={styles.right_section_button}
								c={isOver ? "black" : "white"}
							>
								Di Lomba
								<Space w="sm" />
								<Icon.ChevDown size={16} />
							</Button>
						</>
					}
				/>
			</Flex>
		</Box>
	);
}
