import { Container, Flex, TextInput } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import styles from "./Search.module.css";
import Sort from "./Sort";

export default function Search() {
	const { ref, focused } = useFocusWithin();

	return (
		<Container size="lg" w="100%" mt={56}>
			<Flex
				component="section"
				align="center"
				gap="md"
				justify="space-between"
				className={styles.wrapper}
				style={{
					borderColor: focused
						? "var(--mantine-color-indigo-6)"
						: "var(--mantine-color-gray-3)",
				}}
			>
				<TextInput
					ref={ref}
					variant="unstyled"
					size="lg"
					placeholder="Cari organizer"
					leftSection={<Icon.Search size={20} />}
					classNames={{
						root: styles.input_root,
						section: styles.input_section,
						input: styles.input,
					}}
				/>

				<Sort />
			</Flex>
		</Container>
	);
}
