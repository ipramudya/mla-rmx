import { Button } from "@mantine/core";

export const ButtonOverride = Button.extend({
	defaultProps: {
		radius: "md",
		variant: "default",
	},
});
