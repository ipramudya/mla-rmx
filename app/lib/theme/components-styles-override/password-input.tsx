import { PasswordInput } from "@mantine/core";
import { Icon } from "app/components/Icon";

export const PasswordInputOverride = PasswordInput.extend({
	defaultProps: {
		visibilityToggleIcon({ reveal }) {
			return reveal ? <Icon.Reveal size={16} /> : <Icon.Hide size={16} />;
		},
	},
});
