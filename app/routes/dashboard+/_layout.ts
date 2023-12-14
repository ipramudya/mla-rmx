import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { DEFAULT_CACHE_HEADER } from "app/constant";
import { parseCookie } from "app/functions/parse-cookie.server";
import { me } from "app/services/orgs-data-service";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	"Cache-Control": loaderHeaders.get("Cache-Control")!,
});

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const cookieHeader = request.headers.get("Cookie") || "";
	const parsedCookie = parseCookie(cookieHeader);

	const isAuthenticated = Boolean(parsedCookie.get("refresh_token"));
	if (isAuthenticated) throw redirect("/");

	const isOrganizerLoggedIn = Boolean(parsedCookie.get("organizer_refresh_token"));

	if (isOrganizerLoggedIn && url.pathname === "/dashboard/choose") {
		const { data } = await me(cookieHeader);

		if (data) {
			throw redirect(`/dashboard/${data.organizer.id}`, {
				status: 301,
				headers: DEFAULT_CACHE_HEADER,
			});
		}

		return null;
	}

	return new Response(null, { headers: DEFAULT_CACHE_HEADER });
}
