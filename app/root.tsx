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
import { userMe } from "app/services/user-data-service";
import { useEffect, useState } from "react";
import { useDehydratedState } from "use-dehydrated-state";
import { orgsClientSession } from "./lib/session/organizer-session";
import useOrganizer from "./lib/store/hooks/use-organizer";
import { orgsMe } from "./services/orgs-data-service";
import type { OrganizerUser, ParticipantUser } from "./types";

type LoaderData = {
	user: {
		data: ParticipantUser;
		accessToken: string | null;
	};
	orgs: {
		data: OrganizerUser | undefined;
		accessToken: string | null;
	} | null;
};

export const shouldRevalidate = () => false;

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const refreshToken = parseCookie(cookieHeader).get("refresh_token");
	const isAuthenticated = Boolean(refreshToken);

	if (isAuthenticated) {
		const { data: userMeData, accessToken: userAccessToken } = await userMe(cookieHeader);

		let data = {} as LoaderData;
		if (userMeData) {
			data = {
				user: {
					data: userMeData.user,
					accessToken: userAccessToken,
				},
				orgs: null,
			};

			const orgsRefreshToken = parseCookie(cookieHeader).get("organizer_refresh_token");
			const isOrgsAuthenticated = Boolean(orgsRefreshToken);

			if (isOrgsAuthenticated) {
				const { data: orgsMeData, accessToken: orgsAccessToken } =
					await orgsMe(cookieHeader);

				data = {
					...data,
					orgs: {
						data: orgsMeData?.organizer,
						accessToken: orgsAccessToken,
					},
				};
			}

			return json(data);
		}
	}

	return null;
}

export default function RootApp() {
	const loaderData = useLoaderData<typeof loader>();
	const setUserData = useUser((s) => s.setUserData);
	const setCurrentOrgs = useOrganizer((s) => s.setCurrentOrgs);

	useEffect(() => {
		if (!loaderData) {
			userClientSession.clearAccessToken();
			orgsClientSession.clearAccessToken();
			return;
		}

		if (loaderData) {
			const { user, orgs } = loaderData;

			setUserData(user.data);
			if (user.accessToken) {
				userClientSession.setAccessToken(user.accessToken);
			}

			if (orgs && orgs.data) {
				setCurrentOrgs(orgs.data);
				if (orgs.accessToken) {
					orgsClientSession.setAccessToken(orgs.accessToken);
				}
			}
		}
	}, [loaderData, setCurrentOrgs, setUserData]);

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
