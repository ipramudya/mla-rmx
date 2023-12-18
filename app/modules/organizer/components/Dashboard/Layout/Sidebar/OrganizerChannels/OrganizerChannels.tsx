import { ActionIcon, Divider, Flex, Skeleton, Tooltip } from "@mantine/core";
import { Icon } from "app/components/Icon";
import useOrganizerChannels from "app/modules/organizer/hooks/use-organizer-channels";
import styles from "./OrganizerChannels.module.css";
import OrganizerItem from "./OrganizerItem";

export default function OrganizerChannels() {
	const { organizerChannels, isLoading } = useOrganizerChannels();

	const handleMaximize = () => {
		console.log("maximize");
	};

	const handleCreateOrgs = () => {
		console.log("create orgs");
	};

	return (
		<Flex className={styles.wrapper}>
			<Flex direction="column" gap={16} align="center">
				{!isLoading && organizerChannels?.data ? (
					<>
						{organizerChannels.data.organizers.map((organizer) => (
							<OrganizerItem organizer={organizer} key={organizer.id} />
						))}
						<Divider
							style={{ borderColor: "var(--mantine-color-gray-3)" }}
							orientation="horizontal"
							w="100%"
						/>
						<Tooltip label="Buat Organizer" position="right" openDelay={300}>
							<ActionIcon w={36} h={36} variant="subtle" onClick={handleCreateOrgs}>
								<Icon.Plus size={20} />
							</ActionIcon>
						</Tooltip>
					</>
				) : (
					Array.from({ length: 5 }).map((_, idx) => (
						<Skeleton key={"orgs skeleton " + idx} w={36} h={36} />
					))
				)}
			</Flex>
			<Tooltip label="Expand list organizer" openDelay={300} position="right">
				<ActionIcon w={36} h={36} variant="subtle" color="gray" onClick={handleMaximize}>
					<Icon.Maximize size={20} />
				</ActionIcon>
			</Tooltip>
		</Flex>
	);
}
