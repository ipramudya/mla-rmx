import { Box, Button, Center, Container, Flex, Group, Image } from "@mantine/core";
import { Banner } from "app/assets/images";
import { Icon } from "app/components/Icon";
import styles from "./banner.module.css";
import { FILTERS } from "./utils";

export default function LandingPage() {
	return (
		<Flex component="main" direction="column" gap={42}>
			{/* banner */}
			<Box pos="relative" w="100%" pt={192} mt={-192}>
				<Box
					className={styles.bannerWrapper}
					style={{
						// backgroundImage: "url(./banner1.png)",
						backgroundImage: "url(./https://placehold.co/600x400?text=Placeholder)",
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
		</Flex>
	);
}
