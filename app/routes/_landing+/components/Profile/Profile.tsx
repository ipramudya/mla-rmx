import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "app/components/Icon";
import styles from "./Profile.module.css";

interface Props {
	isOver: boolean;
}

export default function Profile({ isOver }: Props) {
	const [, { toggle }] = useDisclosure();

	return (
		<Button
			px={0}
			style={{ aspectRatio: "1/1" }}
			onClick={toggle}
			className={isOver ? styles.profile_btn_bordered : styles.profile_btn}
			size="md"
		>
			<Icon.User size={18} variant={isOver ? "Outline" : "Bold"} />
		</Button>
	);
}
