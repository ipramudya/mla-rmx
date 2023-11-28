import { createCookie } from "@remix-run/node";

export const SERVER_ACCESS_TOKEN = "s_at";

export const serverAccessToken = createCookie(SERVER_ACCESS_TOKEN, {
	maxAge: 300, // 5min
	path: "/",
	sameSite: "lax",
	httpOnly: true,
	secure: true,
	secrets: [process.env.SESSION_SECRET || ""],
});
