import { Container, SimpleGrid } from "@mantine/core";
import ItemOrganizer from "./ItemOrganizer";

export default function ListOrganizer() {
	return (
		<Container size="lg" w="100%">
			<SimpleGrid cols={3}>
				{Array.from({ length: 12 }).map((_, idx) => (
					<ItemOrganizer key={"poster placeholder " + idx} />
				))}
			</SimpleGrid>
		</Container>
	);
}
