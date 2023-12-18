import { BACKEND_API_URL } from "app/constant";
import type { BaseAPIReturn } from "app/types";

interface APIHandlerOptions extends Omit<RequestInit, "method"> {
	method: "POST" | "GET";
}

/* service handler without bearer access token to call endpoints */
export default async function publicAPIHandler<T>(
	url: string,
	{ headers, ...options }: APIHandlerOptions,
): Promise<Omit<BaseAPIReturn<{ ok: boolean } & T>, "accessToken">> {
	try {
		const res = await fetch(BACKEND_API_URL + url, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Cache: "no-cache",
				...headers,
			},
			...options,
		});

		if (!res.ok) {
			return { data: null, error: `${res.status} -- ${res.statusText}` };
		}

		const data = await res.json();
		return { data, error: null };
	} catch (error) {
		console.log("error-" + url, error);
		return { data: null, error: "Server Error" };
	}
}
