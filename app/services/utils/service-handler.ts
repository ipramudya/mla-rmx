import { BACKEND_API_URL } from "app/constant";
import type { BaseServiceReturn } from "app/services";

interface ServiceHandlerOptions extends Omit<RequestInit, "method"> {
	method: "POST" | "GET";
}

export default async function serviceHandler<T>(
	url: string,
	{ headers, ...options }: ServiceHandlerOptions,
): Promise<Omit<BaseServiceReturn<{ ok: boolean } & T>, "config">> {
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
