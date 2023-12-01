import type { LoaderFunctionArgs } from "@remix-run/node";
import { parseCookie } from "app/functions/parse-cookie.server";
import { verifiedCookie } from "app/lib/cookies/verify-cookie.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeaders = request.headers.get("Cookie");

	if (cookieHeaders) {
		const parsedCookie = parseCookie(cookieHeaders);
		const cookieKeys = Object.keys(parsedCookie);

		for (const cookieKey of cookieKeys) {
			if (["email", "verified"].includes(cookieKey)) {
				return new Response(null, {
					headers: {
						"Set-Cookie":
							cookieKey === "email"
								? "email=''; path:/; Max-Age=-1; HttpOnly"
								: await verifiedCookie.serialize("", {
										maxAge: -1,
										httpOnly: true,
										path: "/",
								  }),
					},
				});
			}

			return new Response(null, { status: 403 });
		}
	}

	return new Response(null, { status: 403 });
}
