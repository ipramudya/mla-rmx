import { Button } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { userClientSession } from "app/lib/session";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import useUser from "app/lib/store/hooks/use-user";
import logout from "app/modules/landing/api/logout";
import logoutOrganizer from "app/modules/organizer/api/logout-organizer";
import { useState } from "react";
import { toast } from "sonner";

const onToastError = () => {
	toast.error("Logout Gagal", {
		description: "Server sedang tidak stabil, silahkan coba lagi",
	});
};

export default function LogoutButton() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const clearUserData = useUser((s) => s.clearUserData);
	const clearOrganizerData = useOrganizer((s) => s.clearOrganizerData);

	const handleLogout = async () => {
		setLoading(true);

		const { error: orgsError } = await logoutOrganizer();

		if (orgsError) {
			onToastError();
			setLoading(false);
			return;
		}

		const { error: userError } = await logout();

		if (userError) {
			onToastError();
			setLoading(false);
			return;
		}
		navigate("/");

		clearUserData();
		clearOrganizerData();

		userClientSession.clearAccessToken();
		orgsClientSession.clearAccessToken();

		// fetcher.load("/");

		setLoading(false);
	};

	return (
		<Button
			fullWidth
			rightSection={<Icon.Logout size={18} />}
			variant="outline"
			color="red"
			onClick={handleLogout}
			loading={loading}
		>
			Keluar Akun
		</Button>
	);
}
