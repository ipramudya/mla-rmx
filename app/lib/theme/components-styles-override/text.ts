import { Text } from "@mantine/core";

export const TextOverride = Text.extend({
	styles(theme, props) {
		if (props.variant === "body-text") {
			return {
				root: {
					color: theme.colors.dark[3],
				},
			};
		}

		return {
			root: {},
		};
	},
});
