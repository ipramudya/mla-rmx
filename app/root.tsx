import "@fontsource-variable/source-sans-3/wght.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
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
import { parseCookie } from "app/functions/parse-cookie.server";
import { userClientSession } from "app/lib/session";
import useUser from "app/lib/store/hooks/use-user";
import theme from "app/lib/theme";
import { me } from "app/services/user-data-service";
import { useEffect } from "react";

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

	if (cookieHeader) {
		const parsedCookie = parseCookie(cookieHeader);
		const authenticated = Boolean(parsedCookie?.refresh_token);

		if (!parsedCookie || !authenticated) return null;

		const { data, ctx } = await me(cookieHeader);

		if (data && ctx) {
			return json(
				{ user: data.user, accessToken: ctx.params.access_token, authenticated },
				{
					headers: {
						"Cache-Control": "private, max-age=60",
					},
				},
			);
		}
	}

	return null;
}

export default function App() {
	const data = useLoaderData<typeof loader>();
	const setUserData = useUser((s) => s.setUserData);

	useEffect(() => {
		if (!data) {
			userClientSession.clearAccessToken();
			return;
		}

		if (data) {
			setUserData(data.user);
			userClientSession.setAccessToken(data.accessToken);
		}
	}, [data, setUserData]);

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
					<Notifications position="top-right" />
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</MantineProvider>
			</body>
		</html>
	);
}
