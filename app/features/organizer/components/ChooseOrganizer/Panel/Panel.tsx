import { Container, Flex } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import Search from "./Search";
import Sort from "./Sort";

export default function Panel() {
	const { ref, focused } = useFocusWithin();

	return (
		<Container size="lg" w="100%" mt={56}>
			<Flex
				component="section"
				align="center"
				gap="md"
				justify="space-between"
				style={{
					paddingBottom: "8px",
					borderBottom: "1px solid",
					borderColor: focused
						? "var(--mantine-color-indigo-6)"
						: "var(--mantine-color-gray-3)",
				}}
			>
				<Search ref={ref} />
				<Sort />
			</Flex>
		</Container>
	);
}
