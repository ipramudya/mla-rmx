import type { AxiosRequestConfig } from "axios";

export declare interface BaseServiceReturn<T> {
	data: T | null;
	error: string | null;
	config: AxiosRequestConfig | null;
}
