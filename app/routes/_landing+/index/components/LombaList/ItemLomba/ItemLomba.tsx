import {
	ActionIcon,
	Badge,
	Box,
	Grid,
	Group,
	HoverCard,
	Stack,
	Text,
	Transition,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import styles from "./ItemLomba.module.css";

interface Props {
	img: string;
}

export default function ItemLomba({ img }: Props) {
	const { ref, hovered } = useHover();

	return (
		<Grid className={styles.wrapper} ref={ref}>
			{/* poster */}
			<Grid.Col span={4} display="flex" style={{ alignItems: "center" }}>
				<Box className={styles.posterWrapper}>
					<Box
						component="img"
						alt="poster"
						src={img}
						pos="absolute"
						inset={0}
						w="100%"
						h="100%"
					/>
				</Box>
			</Grid.Col>
			<Grid.Col span={8}>
				<Stack h="100%">
					<div>
						<Group justify="space-between" align="center" mih={28}>
							<Text component="h4" maw="80%" truncate="end" fw={600}>
								Lorem adipisicing elit. Vitae, earum!
							</Text>
							<Transition
								mounted={hovered}
								transition="fade"
								duration={400}
								timingFunction="ease"
							>
								{(styles) => (
									<ActionIcon
										style={styles}
										variant="gradient"
										aria-label="add to wishlist"
										gradient={{
											from: "var(--mantine-color-gray-0)",
											to: "var(--mantine-color-gray-1)",
											deg: 45,
										}}
									>
										<Icon.Heart size={18} color="var(--mantine-color-red-5)" />
									</ActionIcon>
								)}
							</Transition>
						</Group>
						<Text c="dark.3" truncate="end">
							Organizer lorem dsandaodjaoij
						</Text>
					</div>
					<Stack gap={4} style={{ flexGrow: 1 }}>
						<HoverCard shadow="sm" position="right">
							<HoverCard.Target>
								<Group gap="xs" w="fit-content">
									<Icon.Calendar size={16} />
									<Text truncate="end" fz="sm" variant="body-text">
										13 - 21 Dec 2023
									</Text>
								</Group>
							</HoverCard.Target>
							<HoverCard.Dropdown>
								<div>
									<Text size="xs" mb={2}>
										<strong>Pendaftaran:</strong> 13 - 15 Dec 2023
									</Text>
									<Text size="xs">
										<strong>Pelaksanaan:</strong> 15 - 21 Dec 2023
									</Text>
								</div>
							</HoverCard.Dropdown>
						</HoverCard>
						<Group gap="xs">
							<Icon.Location size={16} />
							<Text truncate="end" fz="sm" variant="body-text">
								Online
							</Text>
						</Group>
						<Group gap="xs">
							<Icon.Wallet size={16} />
							<Text truncate="end" fz="sm" variant="body-text">
								Tidak dipungut biaya
							</Text>
						</Group>
					</Stack>
					<Badge size="sm" variant="light" radius="sm" color="teal">
						berlangsung
					</Badge>
				</Stack>
			</Grid.Col>
		</Grid>
	);
}
