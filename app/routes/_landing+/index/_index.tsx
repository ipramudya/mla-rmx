import { Box, Button, Center, Container, Flex, Group, Image, SimpleGrid } from "@mantine/core";
import { Banner, Poster1, Poster2 } from "app/assets/images";
import { Icon } from "app/components/Icon";
import LombaItem from "./components/LombaItem";
import styles from "./components/banner.module.css";
import { FILTERS } from "./components/utils";

export default function LandingPage() {
	return (
		<Flex component="main" direction="column" gap={42}>
			{/* banner */}
			<Box pos="relative" w="100%" pt={192} mt={-192}>
				<Box
					className={styles.bannerWrapper}
					style={{
						backgroundImage: "url(./banner1.png)",
						// backgroundImage: "url(./https://placehold.co/600x400?text=Placeholder)",
					}}
				/>
				<Container size="xl" pos="relative" style={{ zIndex: 10 }} mt={32}>
					<Center>
						<Image radius="md" fit="cover" src={Banner} />
					</Center>
				</Container>
			</Box>

			{/* filters */}
			<Container size="xl" w="100%">
				<Flex component="section" justify="space-between" align="center" gap={20}>
					<Group>
						{FILTERS.map((x) => (
							<Button
								key={x.key + "placeholder"}
								size="md"
								c={x.key !== "all" ? "gray.6" : "unset"}
								styles={{
									label: { fontWeight: x.key !== "all" ? 400 : "unset" },
								}}
							>
								{x.label}
							</Button>
						))}
					</Group>
					<Button rightSection={<Icon.Filter size={16} />} size="md">
						Filter
					</Button>
				</Flex>
			</Container>

			{/* all lomba */}
			<Container size="xl" w="100%">
				<SimpleGrid cols={3}>
					{Array.from({ length: 12 }).map((_, idx) => (
						<LombaItem
							key={"poster placeholder " + idx}
							img={idx % 2 === 0 ? Poster1 : Poster2}
						/>
					))}
				</SimpleGrid>
			</Container>
		</Flex>
	);
}
