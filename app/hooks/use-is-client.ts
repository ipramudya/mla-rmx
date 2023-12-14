import { useEffect, useState } from "react";

export default function useIsClient() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsClient(true);
		}
	}, []);

	return isClient;
}
