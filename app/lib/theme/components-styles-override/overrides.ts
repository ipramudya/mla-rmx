import type { MantineThemeComponents } from "@mantine/core";
import { ButtonOverride } from "./button";
import { PasswordInputOverride } from "./password-input";
import { TextOverride } from "./text";

const componentsOverriding = {
	Button: ButtonOverride,
	PasswordInput: PasswordInputOverride,
	Text: TextOverride,
} as MantineThemeComponents;

export default componentsOverriding;
