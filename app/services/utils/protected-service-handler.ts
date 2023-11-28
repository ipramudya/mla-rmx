import { BACKEND_API_URL } from "app/constant";
import { userClientSession } from "app/lib/session/client";
import type { BaseServiceReturn } from "app/services";
import axios from "axios";

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

const axiosInstance = axios.create({
	baseURL: BACKEND_API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (request) => {
		// const resourceType = request.headers.get("X-Resource-Type");

		const accessToken = userClientSession.getAccessToken();
		if (accessToken) {
			request.headers["Authorization"] = "Bearer " + accessToken;
		}

		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const previousRequest = error.config;

		if (error.response.status === 401 && !previousRequest._retry) {
			try {
				const refreshTokenResponse = await axiosInstance({
					method: "post",
					url: "/auth/refresh",
					headers: previousRequest.headers,
				});

				if (refreshTokenResponse.data.access_token) {
					userClientSession.setAccessToken(refreshTokenResponse.data.access_token);
				}

				return axiosInstance(previousRequest);
			} catch (_error) {
				return Promise.reject(_error);
			}
		}

		return Promise.reject(error);
	},
);

export default async function protectedServiceHandler<T>(
	url: string,
	opts: RequestOptions,
): Promise<BaseServiceReturn<{ ok: boolean } & T>> {
	try {
		const res = await axiosInstance<T>({
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

		if (res.status > 300 || !res.data) {
			return { data: null, error: `${res.status} -- ${res.statusText}` };
		}

		// @ts-expect-error extending generic
		return { data: res.data, error: null };
	} catch (error: any) {
		console.log("error-" + url, error.message);
		return { data: null, error: "Server Error" };
	}
}
