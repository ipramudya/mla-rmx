import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { HEADER_CACHE_CONTROL } from "app/constant";
import { parseCookie } from "app/functions/parse-cookie.server";
import { CLIENT_SESSION_ACCESS_TOKEN } from "app/lib/session";
import { me } from "app/services/orgs-data-service";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	"Cache-Control": loaderHeaders.get("Cache-Control")!,
});

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const cookieHeader = request.headers.get("Cookie") || "";
	const parsedCookie = parseCookie(cookieHeader);

	const isUnauthenticated =
		!parsedCookie?.refresh_token || !parsedCookie?.[CLIENT_SESSION_ACCESS_TOKEN];

	if (isUnauthenticated) throw redirect("/");

	const isOrganizerLoggedIn = parsedCookie?.organizer_refresh_token;

	if (isOrganizerLoggedIn && url.pathname === "/dashboard/choose") {
		const { data } = await me(cookieHeader);

		if (data) {
			console.log("runs");
			return redirect(`/dashboard/${data.organizer.id}`, {
				status: 301,
				headers: HEADER_CACHE_CONTROL,
			});
		}

		return null;
	}

	return new Response(null, { headers: HEADER_CACHE_CONTROL });
}
