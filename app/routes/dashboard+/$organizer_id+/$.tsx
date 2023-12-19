import type { HandleErrorFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import Simple404 from "app/components/404/Simple404";
import useOrganizer from "app/lib/store/hooks/use-organizer";

export const loader: LoaderFunction = () => {
	throw json(null, { status: 404 });
};

/* handle outlet empty leaf warning  */
export default function Component() {
	return false;
}

export const ErrorBoundary: HandleErrorFunction = () => {
	const currentOrganizer = useOrganizer((s) => s.organizerData);

	return <Simple404 fallbackUrl={`/dashboard/${currentOrganizer?.id}`} />;
};
