import { axiosInstance as axiosInstanceV2 } from "app/lib/axios/instance";
import type { BaseServiceReturn } from "..";

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

export default async function protectedServiceHandler<T>(
	url: string,
	opts: RequestOptions,
): Promise<BaseServiceReturn<{ ok: boolean } & T & { config: any }>> {
	try {
		const { data, status, statusText, config } = await axiosInstanceV2<T>({
			url,
			method: remapRequestMethod.get(opts.method) || "get",
			headers: opts.asOrganizer
				? {
						"X-Resource-Type": "organizer",
						...opts.headers,
				  }
				: opts.headers,
			data: opts.body,
		});

		if (status > 300 || !data) {
			return { data: null, error: `${status} -- ${statusText}`, config: null };
		}

		// @ts-expect-error extending generic
		return { data, error: null, config };
	} catch (error: any) {
		console.log("error-" + url, error.message);
		return { data: null, error: "Server Error", config: null };
	}
}
