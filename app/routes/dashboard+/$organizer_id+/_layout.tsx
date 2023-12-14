import type { LoaderFunctionArgs } from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { parseCookie } from "app/functions/parse-cookie.server";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import DashboardLayoutSkeleton from "app/modules/organizer/components/Dashboard/Layout/Skeleton";
import { me } from "app/services/orgs-data-service";
import { Suspense, useCallback, useEffect } from "react";

export function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie") || "";

	const isOrgsAuthenticated = parseCookie(cookieHeader).get("organizer_refresh_token");
	if (!isOrgsAuthenticated) throw redirect("/");

	const meResponse = me(cookieHeader);

	return defer({ loaderResponse: meResponse }, { headers: { "Cache-Control": "no-store" } });
}

export default function InnerDashboardLayout() {
	const { loaderResponse } = useLoaderData<typeof loader>();

	const setCurrentOrgs = useOrganizer((s) => s.setCurrentOrgs);
	const currentOrgs = useOrganizer((s) => s.organizerData);

	const handleDeferedResponse = useCallback(async () => {
		if (loaderResponse !== undefined) {
			const { data, ctx } = await loaderResponse;

			if (data && ctx) {
				const accessToken = ctx.params.access_token;

				const hasAccessToken = Boolean(orgsClientSession.getAccessToken());
				if (!hasAccessToken) {
					orgsClientSession.setAccessToken(accessToken);
				}

				const isOrgsDataAlreadyStored = Boolean(
					currentOrgs && currentOrgs.id === data.organizer.id,
				);
				if (!isOrgsDataAlreadyStored) {
					setCurrentOrgs(data.organizer);
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		handleDeferedResponse();
	}, [handleDeferedResponse]);

	return (
		<Suspense fallback={<DashboardLayoutSkeleton />}>
			<Await resolve={loaderResponse}>{(resolved) => <Outlet context={resolved} />}</Await>
		</Suspense>
	);
}
