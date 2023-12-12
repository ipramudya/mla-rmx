import { SimpleGrid, Skeleton } from "@mantine/core";

export default function ListOrganizerSkeleton() {
	return (
		<SimpleGrid cols={3}>
			{Array.from({ length: 9 }).map((_, idx) => (
				<Skeleton key={`list organizer ${idx}`} h={250} />
			))}
		</SimpleGrid>
	);
}
