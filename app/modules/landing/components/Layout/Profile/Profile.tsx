import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import useUser from "app/lib/store/hooks/use-user";
import clsx from "clsx";
import styles from "./Profile.module.css";
import ProfileSidebar from "./ProfileSidebar";

interface Props {
	isScrolledOver: boolean;
}

export default function Profile({ isScrolledOver }: Props) {
	const user = useUser((s) => s.userData);

	const [isOpen, { toggle, close }] = useDisclosure();

	return (
		<>
			<Button
				onClick={toggle}
				className={clsx(
					isScrolledOver ? styles.profile_btn2 : styles.profile_btn1,
					styles.profile_btn,
				)}
				leftSection={<Icon.User size={16} variant={isScrolledOver ? "Outline" : "Bold"} />}
			>
				<Text truncate="end" maw="70px" size="sm" fw={600} lh={1}>
					{user?.full_name ?? "-"}
				</Text>
			</Button>

			<ProfileSidebar opened={isOpen} onClose={close} userFullName={user?.full_name} />
		</>
	);
}
