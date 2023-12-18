import "@fontsource-variable/source-sans-3/wght.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import type {
	HandleErrorFunction,
	HeadersFunction,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
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
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import globalStyles from "app/assets/styles/global.css";
import ErrorNotFoundPage from "app/components/404";
import Notification from "app/components/Notification";
import { parseCookie } from "app/functions/parse-cookie.server";
import { userClientSession } from "app/lib/session";
import useUser from "app/lib/store/hooks/use-user";
import theme from "app/lib/theme";
import { me } from "app/services/user-data-service";
import { useEffect, useState } from "react";
import { useDehydratedState } from "use-dehydrated-state";
import { DEFAULT_CACHE_HEADER } from "./constant";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const refreshToken = parseCookie(cookieHeader).get("refresh_token");
	const isAuthenticated = Boolean(refreshToken);

	if (isAuthenticated) {
		const { data, accessToken } = await me(cookieHeader);

		if (data) {
			return json(
				{
					user: data.user,
					accessToken,
					authenticated: isAuthenticated,
				},
				{
					headers: DEFAULT_CACHE_HEADER,
				},
			);
		}
	}

	return null;
}

export default function RootApp() {
	const data = useLoaderData<typeof loader>();
	const setUserData = useUser((s) => s.setUserData);

	useEffect(() => {
		if (!data) {
			userClientSession.clearAccessToken();
			return;
		}

		if (data && data.accessToken) {
			setUserData(data.user);
			userClientSession.setAccessToken(data.accessToken);
		}
	}, [data, setUserData]);

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: { staleTime: 60 * 1000 },
				},
			}),
	);
	const dehydratedState = useDehydratedState();

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
					<QueryClientProvider client={queryClient}>
						<HydrationBoundary state={dehydratedState}>
							<Outlet />
							<Notification />
							<ReactQueryDevtools initialIsOpen={false} />
						</HydrationBoundary>
					</QueryClientProvider>
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</MantineProvider>
			</body>
		</html>
	);
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	"Cache-Control": loaderHeaders.get("Cache-Control")!,
});

export const links: LinksFunction = () => [
	...(cssBundleHref
		? [
				{ rel: "stylesheet", href: cssBundleHref },
				{ rel: "stylesheet", href: globalStyles },
		  ]
		: []),
];

export const meta: MetaFunction = () => {
	return [{ title: "Mulailomba" }, { name: "description", content: "Mulailomba..." }];
};

export const ErrorBoundary: HandleErrorFunction = ErrorNotFoundPage;
