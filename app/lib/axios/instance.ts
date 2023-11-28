import { BACKEND_API_URL } from "app/constant";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: BACKEND_API_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (request) => {
		return request;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		return Promise.reject(error);
	},
);

export { axiosInstance };
