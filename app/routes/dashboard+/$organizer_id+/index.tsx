import useOrganizerId from "app/modules/organizer/hooks/use-organizer-id";

export default function DashboardOrganizerLandingPage() {
	const { organizerId } = useOrganizerId();

	return (
		<div>
			<p>dashboard {organizerId}</p>
		</div>
	);
}
