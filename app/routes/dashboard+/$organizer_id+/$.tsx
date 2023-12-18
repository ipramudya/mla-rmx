import type { HandleErrorFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useAsyncValue } from "@remix-run/react";
import Simple404 from "app/components/404/Simple404";
import type { LoaderData } from "./_layout";

export const loader: LoaderFunction = () => {
	throw json(null, { status: 404 });
};

/* handle outlet empty leaf warning  */
export default function Component() {
	return false;
}

export const ErrorBoundary: HandleErrorFunction = () => {
	const asyncValue = useAsyncValue() as LoaderData;

	return <Simple404 fallbackUrl={`/dashboard/${asyncValue.data?.organizer.id}`} />;
};
