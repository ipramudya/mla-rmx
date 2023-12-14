import { useParams } from "@remix-run/react";

export default function useOrganizerId() {
	const params = useParams() as { organizer_id: string };

	return { organizerId: params.organizer_id };
}
