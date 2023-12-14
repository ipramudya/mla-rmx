export const APP_MODE = process.env.NODE_ENV;
export const IS_PRODUCTION = APP_MODE === "production";

export const COOKIES_OPTIONS = {
	DOMAIN: IS_PRODUCTION ? ".mulailomba.com" : "localhost",
	SAME_SITE: IS_PRODUCTION ? "none" : "lax",
	HTTP_ONLY: IS_PRODUCTION,
	SECURE: IS_PRODUCTION,
};

export const BACKEND_API_URL = IS_PRODUCTION
	? "https://api-dev.mulailomba.com/v1"
	: "http://localhost:8080/v1";

export const APP_API_URL = IS_PRODUCTION
	? "https://rmx.mulailomba.com/api"
	: "http://localhost:3000/api";

export const APP_STATIC_URL = IS_PRODUCTION
	? "https://rmx.mulailomba.com/static/images"
	: "http://localhost:3000/static/images";

export const IS_SERVER = typeof window === "undefined";

export const HEADER_CACHE_CONTROL = { "Cache-Control": "private, max-age=300" };
