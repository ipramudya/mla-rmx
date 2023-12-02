import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { parseCookie } from "app/functions/parse-cookie.server";
import { CLIENT_SESSION_ACCESS_TOKEN } from "app/lib/session";

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const cookieHeader = request.headers.get("Cookie") || "";
	const parsedCookie = parseCookie(cookieHeader);

	if (
		!parsedCookie ||
		!parsedCookie.refresh_token ||
		!parsedCookie[CLIENT_SESSION_ACCESS_TOKEN]
	) {
		return redirect("/");
	}

	return url.pathname === "/dashboard" ? redirect("/dashboard/choose") : null;
}
