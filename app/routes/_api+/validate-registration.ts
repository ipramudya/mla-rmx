import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { BACKEND_API_URL } from "app/constant";
import { verifiedCookie } from "app/lib/cookies/verify-cookie.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const id = url.searchParams.get("id");

	if (!id) redirect("/");

	const res = await fetch(BACKEND_API_URL + "/auth/user/verify", {
		headers: {
			Accept: "application/json",
			Cookie: request.headers.get("Cookie") || "",
			"Content-Type": "application/json",
		},
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ id }),
	});

	if (!res.ok) redirect("/register?error=true");

	return redirect("/auth/register/fill", {
		headers: {
			"Set-Cookie": await verifiedCookie.serialize(id),
		},
	});
}
