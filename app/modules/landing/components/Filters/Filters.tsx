import { Button, Container, Flex, Group } from "@mantine/core";
import { Icon } from "app/components/Icon";
import { FILTERS } from "./filter-data";

export default function Filters() {
	return (
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
	);
}
