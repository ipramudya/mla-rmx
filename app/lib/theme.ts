import type { MantineTheme } from "@mantine/core";
import focusStyles from "app/styles/focus.module.css";
import componentsOverriding from "./components-styles-override";

/* main core theme */
const theme = {
	fontFamily: "Source Sans 3 Variable, sans-serif",
	fontFamilyMonospace: "Monaco, Courier, monospace",
	headings: { fontFamily: "Source Sans 3 Variable, sans-serif" },
	focusClassName: focusStyles.focus,
	defaultRadius: "md",
	primaryColor: "indigo",
	colors: {
		indigo: [
			"#eef2ff",
			"#e0e7ff",
			"#c7d2fe",
			"#a5b4fc",
			"#818cf8",
			"#6366f1",
			"#4f46e5",
			"#4338ca",
			"#3730a3",
			"#312e81",
		],
	} as unknown,
	defaultGradient: {
		from: "#818cf8",
		to: "#4338ca",
		deg: 45,
	},

	// overriding all components goes here
	components: componentsOverriding,
} as MantineTheme;

export default theme;
