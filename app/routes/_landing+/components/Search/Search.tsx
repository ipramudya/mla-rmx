import { Box, Button, Divider, Flex, Space, TextInput } from "@mantine/core";
import { Icon } from "app/components/Icon";
import styles from "./search.module.css";

export default function Search() {
	return (
		<Box pos="relative" miw={{ md: 340, lg: 360, xl: 420 }}>
			<Flex pos="relative">
				<TextInput
					placeholder="Temukan sesuatu menarik..."
					w="100%"
					unstyled
					leftSection={<Icon.Search size={16} />}
					classNames={{
						wrapper: styles.inputWrapper,
						input: styles.inputItSelf,
						section: styles.inputSection,
					}}
					rightSection={
						<>
							<Divider orientation="vertical" style={{ borderColor: "white" }} />
							<Button
								px={0}
								pl={12}
								style={{
									background: "transparent",
									border: "none",
									color: "white",
								}}
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
