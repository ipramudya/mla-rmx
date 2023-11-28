import "@fontsource-variable/source-sans-3/wght.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import globalStyles from "app/assets/styles/global.css";
import theme from "app/lib/theme";
import { userClientSession } from "./lib/session";
import UserData from "./services/api/user/UserData";

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

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	if (!cookieHeader) return null;

	const { data, config } = await UserData.me(cookieHeader);

	if (data) {
		return json(
			{ user: data.user, accessToken: config?.params.access_token },
			{
				headers: {
					"Cache-Control": "private, max-age=10",
				},
			},
		);
	}

	return null;
}

export default function App() {
	const data = useLoaderData<typeof loader>();

	if (data) {
		console.log("data", data);
		userClientSession.setAccessToken(data.accessToken);
	}

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
