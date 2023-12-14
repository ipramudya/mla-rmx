import { BACKEND_API_URL, IS_SERVER } from "app/constant";
import { parseCookie } from "app/functions/parse-cookie.server";
import { CLIENT_SESSION_ACCESS_TOKEN, userClientSession } from "app/lib/session";
import axios from "axios";
import { ORGS_SESSION_ACCESS_TOKEN, orgsClientSession } from "../session/organizer-session";

const axiosInstance = axios.create({
	baseURL: BACKEND_API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (request) => {
		const isRetry = request.headers.get("X-Retry");
		const resourceType = request.headers.get("X-Resource-Type");

		let token;

		/* ambil access token dari cookie header */
		if (IS_SERVER) {
			const cookieHeaders = request.headers.get("Cookie")?.toString() || "";

			token =
				resourceType && resourceType === "organizer"
					? parseCookie(cookieHeaders).get(ORGS_SESSION_ACCESS_TOKEN)
					: parseCookie(cookieHeaders).get(CLIENT_SESSION_ACCESS_TOKEN);
		} else {
			token =
				resourceType && resourceType === "organizer"
					? orgsClientSession.getAccessToken()
					: userClientSession.getAccessToken();
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
		const resourceType = previousRequest.headers.get("X-Resource-Type");

		if (error.response.status === 401 && !isRetry) {
			try {
				const refreshTokenResponse = await axiosInstance({
					method: "post",
					url: "/auth/refresh",
					headers: previousRequest.headers,
				});

				if (refreshTokenResponse.data && refreshTokenResponse.data.access_token) {
					const newAccessToken = refreshTokenResponse.data.access_token;

					if (!IS_SERVER) {
						if (resourceType && resourceType === "organizer") {
							orgsClientSession.setAccessToken(newAccessToken);
						} else {
							userClientSession.setAccessToken(newAccessToken);
						}
					}

					previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
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
