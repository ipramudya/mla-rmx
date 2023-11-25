import type { MantineThemeComponents } from "@mantine/core";
import { ButtonOverride } from "./button";

const componentsOverriding = {
	Button: ButtonOverride,
} as MantineThemeComponents;

export default componentsOverriding;
