import { useParams } from "@remix-run/react";

export default function useOrganizerId() {
	const params = useParams() as { organizer_id: string };

	return params.organizer_id;
}
