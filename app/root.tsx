import "@fontsource-variable/source-sans-3/wght.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import theme from "app/lib/theme";
import globalStyles from "app/styles/global.css";

export const links: LinksFunction = () => [
	...(cssBundleHref
		? [
				{ rel: "stylesheet", href: cssBundleHref },
				{ rel: "stylesheet", href: globalStyles },
				{ rel: "icon", href: "/icon.svg", type: "image/svg" },
		  ]
		: []),
];

export const meta: MetaFunction = () => {
	return [{ title: "Mulailomba" }, { name: "description", content: "Mulailomba..." }];
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme}>
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</MantineProvider>
			</body>
		</html>
	);
}
