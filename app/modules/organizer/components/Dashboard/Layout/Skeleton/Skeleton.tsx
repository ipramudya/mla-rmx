import { Box, Flex, SimpleGrid, Skeleton, Stack } from "@mantine/core";

export default function DashboardLayoutSkeleton() {
	return (
		<Box pos="fixed" inset={0} w="100%" h="100dvh" bg="gray.0" p={8}>
			<Flex gap={8} direction="column" h="100%">
				{/* header skeleton */}
				<Flex
					px={24}
					bg="white"
					align="center"
					justify="space-between"
					mih={70}
					style={{ borderRadius: "10px" }}
				>
					<Skeleton h={31} w={220} />
					<Skeleton h={36} w={128} />
				</Flex>

				{/* main content skeleton */}
				<Flex gap={8} h="100%">
					{/* orgs list skeleton */}
					<Flex
						bg="white"
						direction="column"
						gap={16}
						p={12}
						style={{ borderRadius: "10px" }}
					>
						{Array.from({ length: 4 }).map((_, idx) => (
							<Skeleton key={"orgs skeleton " + idx} w={36} h={36} />
						))}
					</Flex>

					{/* sidebar skeleton */}
					<Flex
						gap={16}
						p={12}
						direction="column"
						miw={248}
						bg="white"
						style={{ borderRadius: "10px" }}
					>
						<Skeleton w="100%" h={47} />
						<Stack gap={12}>
							{Array.from({ length: 7 }).map((_, idx) => (
								<Box key={"sidebar skeleton" + idx} w="100%" mih={42}>
									<Skeleton h={23} w={96} />
								</Box>
							))}
						</Stack>
					</Flex>

					{/* main content itself skeleton */}
					<Flex
						direction="column"
						bg="white"
						gap={32}
						px={32}
						py={24}
						style={{ flexGrow: 1, borderRadius: "10px" }}
					>
						<Box>
							<Skeleton w={238} h={37} />
						</Box>
						<SimpleGrid cols={3} spacing={24}>
							{Array.from({ length: 3 }).map((_, idx) => (
								<Skeleton key={"content 1 skeleton " + idx} h={224} />
							))}
						</SimpleGrid>
						<Flex direction="column" gap={4}>
							<Skeleton h={28} w={140} />
							<Skeleton h={20} w={380} />
						</Flex>
						<SimpleGrid cols={3} spacing={24}>
							{Array.from({ length: 3 }).map((_, idx) => (
								<Skeleton key={"content 2 skeleton " + idx} h={224} />
							))}
						</SimpleGrid>
						<Flex direction="column" gap={4}>
							<Skeleton h={28} w={140} />
							<Skeleton h={20} w={380} />
						</Flex>
						<SimpleGrid cols={3} spacing={24}>
							{Array.from({ length: 3 }).map((_, idx) => (
								<Skeleton key={"content 3 skeleton " + idx} h={224} />
							))}
						</SimpleGrid>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}
