import { BACKEND_API_URL, IS_SERVER } from "app/constant";
import { parseCookie } from "app/functions/parse-cookie.server";
import { CLIENT_SESSION_ACCESS_TOKEN, userClientSession } from "app/lib/session";
import AuthUser from "app/services/api/user/AuthUser";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: BACKEND_API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (request) => {
		let token;
		if (IS_SERVER) {
			const cookieHeaders = request.headers.get("Cookie")?.toString() || "";
			token = parseCookie(cookieHeaders)[CLIENT_SESSION_ACCESS_TOKEN];
		} else {
			token = userClientSession.getAccessToken();
		}

		if (token) {
			request.headers["Authorization"] = `Bearer ${token}`;
		}

		return request;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.config.headers.Authorization) {
			response.config.params = {
				access_token: response.config.headers["Authorization"].toString().split(" ")[1],
			};
		}

		return response;
	},
	async (error) => {
		const previousRequest = error.config;

		if (error.response.status === 401 && !previousRequest._retry) {
			try {
				const { data, error } = await AuthUser.refreshAccessToken(
					IS_SERVER ? previousRequest.headers.get("Cookie") : undefined,
				);
				if (error) return Promise.reject(error);

				if (data && data.access_token) {
					if (!IS_SERVER) {
						userClientSession.setAccessToken(data.access_token);
					}

					previousRequest.headers["Authorization"] = `Bearer ${data.access_token}`;
					return axiosInstance(previousRequest);
				}
			} catch (_error) {
				return Promise.reject(_error);
			}
		}

		return Promise.reject(error);
	},
);

export { axiosInstance };
