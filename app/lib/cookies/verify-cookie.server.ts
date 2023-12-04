import { createCookie } from "@remix-run/node";

export const VERIFY_COOKIE_NAME = "verified";

export const verifiedCookie = createCookie("verified", { httpOnly: true, path: "/" });
