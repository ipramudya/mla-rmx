export declare interface BaseServiceReturn<T> {
	data: T | null;
	error: string | null;
}

export { default as protectedServiceHandler } from "./utils/protected-service-handler";
export { default as serviceHandler } from "./utils/service-handler";
