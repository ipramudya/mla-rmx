import { Button } from "@mantine/core";
import { useFetcher, useLocation, useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import logout from "app/features/landing/api/logout";
import { userClientSession } from "app/lib/session";
import useUser from "app/lib/store/hooks/use-user";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const clearUserData = useUser((s) => s.clearUserData);
	const fetcher = useFetcher();

	const onLogout = async () => {
		setLoading(true);

		const { data, error } = await logout();

		if (data && !error) {
			clearUserData();

			userClientSession.clearAccessToken();

			fetcher.load("/");
		} else {
			toast.error("Logout Gagal", {
				description: "Server sedang tidak stabil, silahkan coba lagi",
			});
		}

		if (pathname.includes("dashboard")) {
			navigate("/");
		}

		setLoading(false);
	};

	return (
		<Button
			fullWidth
			rightSection={<Icon.Logout size={18} />}
			variant="outline"
			color="red"
			onClick={onLogout}
			loading={loading}
		>
			Keluar
		</Button>
	);
}
