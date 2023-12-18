import { Button, Stack } from "@mantine/core";
import { useAsyncValue, useNavigate, useNavigation } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import LoadingOverlay from "app/components/LoadingOverlay";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import logoutOrganizer from "app/modules/organizer/api/logout-organizer";
import type { LoaderData } from "app/routes/dashboard+/$organizer_id+/_layout";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function BottomSidebar() {
	const [loading, setLoading] = useState(false);
	const { data } = useAsyncValue() as LoaderData;

	const navigate = useNavigate();
	const navigation = useNavigation();

	const clearOrganizerData = useOrganizer((s) => s.clearOrganizerData);

	const isNavigatingOutsideDashboard = useMemo(() => {
		if (
			navigation.location &&
			data &&
			!navigation.location.pathname.includes(data.organizer.id || "")
		)
			return true;

		return false;
	}, [data, navigation.location]);

	const handleSwitchToHomesite = () => {
		navigate("/");
	};

	const handleLogoutOrg = async () => {
		setLoading(true);

		const { error } = await logoutOrganizer();
		if (error) {
			toast.error("Error", {
				description: "Gagal melakukan logout organizer",
			});
			setLoading(false);
		}

		orgsClientSession.clearAccessToken();
		clearOrganizerData();
		navigate("/dashboard/choose");
		setLoading(false);
	};

	return (
		<>
			{navigation.state === "loading" && isNavigatingOutsideDashboard && (
				<LoadingOverlay visible fillWindow />
			)}
			<Stack p={12} style={{ borderRadius: "10px" }} bg="white">
				<Button
					variant="subtle"
					color="gray"
					role="link"
					leftSection={<Icon.Back size={20} />}
					styles={{
						inner: {
							justifyContent: "start",
						},
					}}
					onClick={handleSwitchToHomesite}
				>
					Beralih ke Halaman Utama
				</Button>
				<Button
					variant="subtle"
					color="red"
					leftSection={<Icon.Logout size={20} />}
					loading={loading}
					styles={{
						section: { transform: "rotate(180deg)" },
						inner: { justifyContent: "start" },
					}}
					onClick={handleLogoutOrg}
				>
					Keluar Organizer
				</Button>
			</Stack>
		</>
	);
}
