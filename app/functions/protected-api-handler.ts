import { axiosInstance } from "app/lib/axios/instance";
import type { BaseAPIReturn } from "app/types";

const remapRequestMethod = new Map([
	["GET", "get"],
	["POST", "post"],
]);

type RequestOptions = {
	method: "GET" | "POST";
	headers?: Record<string, string>;
	body?: Record<string, any>;
	asOrganizer?: boolean;
};

/* service handler with bearer access token and token expiry rotation */
export default async function protectedAPIHandler<T>(
	url: string,
	opts: RequestOptions,
): Promise<BaseAPIReturn<{ ok: boolean } & T>> {
	try {
		const headers = opts.asOrganizer
			? { "X-Resource-Type": "organizer", ...opts.headers }
			: opts.headers;

		const { data, status, statusText, config } = await axiosInstance<T>({
			url,
			method: remapRequestMethod.get(opts.method) || "get",
			headers,
			data: opts.body,
		});

		if (status > 300 || !data) {
			return { data: null, error: `${status} -- ${statusText}`, ctx: null };
		}

		// @ts-expect-error extending generic
		return { data, error: null, ctx: config };
	} catch (error: any) {
		console.log("error-" + url, error.message);
		return { data: null, error: "Server Error", ctx: null };
	}
}
