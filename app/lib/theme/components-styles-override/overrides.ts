import type { MantineThemeComponents } from "@mantine/core";
import { ButtonOverride } from "./button";
import { PasswordInputOverride } from "./password-input";

const componentsOverriding = {
	Button: ButtonOverride,
	PasswordInput: PasswordInputOverride,
} as MantineThemeComponents;

export default componentsOverriding;
