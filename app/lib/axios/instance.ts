import { BACKEND_API_URL, IS_SERVER } from "app/constant";
import { parseCookie } from "app/functions/parse-cookie.server";
import { CLIENT_SESSION_ACCESS_TOKEN, userClientSession } from "app/lib/session";
import { refreshAccessToken } from "app/services/auth-user-service";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: BACKEND_API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (request) => {
		const isRetry = request.headers.get("X-Retry");

		let token;
		if (IS_SERVER) {
			const cookieHeaders = request.headers.get("Cookie")?.toString() || "";

			token = parseCookie(cookieHeaders)[CLIENT_SESSION_ACCESS_TOKEN];
		} else {
			token = userClientSession.getAccessToken();
		}

		/* jika X-Retry header ada, berarti bearer header telah diatur pada fail interceptor response */
		if (token && !isRetry) {
			request.headers["Authorization"] = `Bearer ${token}`;
		}

		return request;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => {
		if (IS_SERVER && response.config.headers["Authorization"]) {
			response.config.params = {
				access_token: response.config.headers["Authorization"].toString().split(" ")[1],
			};
		}

		return response;
	},
	async (error) => {
		const previousRequest = error.config;
		const isRetry = previousRequest.headers.get("X-Retry");

		if (error.response.status === 401 && !isRetry) {
			try {
				const { data, error } = await refreshAccessToken(
					IS_SERVER ? previousRequest.headers.get("Cookie") : undefined,
				);

				if (data && data.access_token && !error) {
					if (!IS_SERVER) {
						userClientSession.setAccessToken(data.access_token);
					}

					previousRequest.headers["Authorization"] = `Bearer ${data.access_token}`;
					previousRequest.headers["X-Retry"] = "true";

					return axiosInstance(previousRequest);
				}

				return Promise.reject(error);
			} catch (_error) {
				return Promise.reject(_error);
			}
		}

		return Promise.reject(error);
	},
);

export { axiosInstance };
