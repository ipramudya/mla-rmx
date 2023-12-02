import { Container, SimpleGrid } from "@mantine/core";
import { Poster1, Poster2 } from "app/assets/images";
import ItemLomba from "./ItemLomba";

export default function LombaList() {
	return (
		<Container size="xl" w="100%">
			<SimpleGrid cols={3}>
				{Array.from({ length: 12 }).map((_, idx) => (
					<ItemLomba
						key={"poster placeholder " + idx}
						img={idx % 2 === 0 ? Poster1 : Poster2}
					/>
				))}
			</SimpleGrid>
		</Container>
	);
}
