import { Anchor, Text, type AnchorProps, type TextProps } from "@mantine/core";
import { Link, type LinkProps } from "@remix-run/react";
import type { PropsWithChildren } from "react";
import styles from "./a.module.css";

interface Props extends PropsWithChildren<AnchorProps & LinkProps> {
	textProps?: TextProps;
}

export default function A({ textProps, ...props }: Props) {
	return (
		<Anchor component={Link} underline="never" {...props}>
			<Text c="dark.5" lh={0} className={styles.text} {...textProps}>
				{props.children}
			</Text>
		</Anchor>
	);
}
