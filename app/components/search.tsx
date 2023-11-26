import { Box, Button, Flex, TextInput } from "@mantine/core";
import { Icon } from "app/components/icon";

export default function Search() {
	return (
		<Box pos="relative" miw={{ md: 340, lg: 360, xl: 420 }}>
			<Flex pos="relative">
				<TextInput
					placeholder="Temukan sesuatu menarik..."
					w="100%"
					leftSection={<Icon.Search size={16} />}
					rightSection={
						<Button
							px={12}
							style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
						>
							Di Lomba
							<Icon.ChevDown size={16} />
						</Button>
					}
				/>
			</Flex>
		</Box>
	);
}
