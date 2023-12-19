import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { DEFAULT_CACHE_HEADER } from "app/constant";
import { parseCookie } from "app/functions/parse-cookie.server";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	"Cache-Control": loaderHeaders.get("Cache-Control")!,
});

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const cookieHeader = request.headers.get("Cookie") || "";
	const parsedCookie = parseCookie(cookieHeader);

	const isAuthenticated = Boolean(parsedCookie.get("refresh_token"));
	if (!isAuthenticated) throw redirect("/");

	const isOrganizerLoggedIn = Boolean(parsedCookie.get("organizer_refresh_token"));

	if (isOrganizerLoggedIn && url.pathname === "/dashboard/choose") {
		throw redirect("/");
	}

	return new Response(null, { headers: DEFAULT_CACHE_HEADER });
}
