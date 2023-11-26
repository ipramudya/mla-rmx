import { Anchor, Text, type AnchorProps, type TextProps } from "@mantine/core";
import { Link, type LinkProps } from "@remix-run/react";
import useHeader from "app/hooks/useHeader";
import type { PropsWithChildren } from "react";
import styles from "./HeaderLink.module.css";

interface Props extends PropsWithChildren<AnchorProps & LinkProps> {
	textProps?: TextProps;
}

export default function HeaderLink({ textProps, ...props }: Props) {
	const { isOver } = useHeader();

	return (
		<Anchor component={Link} underline="never" {...props}>
			<Text
				c={isOver ? "dark" : "white"}
				lh={1}
				fw={600}
				className={styles.text_base}
				{...textProps}
			>
				{props.children}
			</Text>
		</Anchor>
	);
}
