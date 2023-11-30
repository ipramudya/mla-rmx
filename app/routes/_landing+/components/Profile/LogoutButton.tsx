import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useFetcher } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { userClientSession } from "app/lib/session";
import useUser from "app/lib/store/hooks/use-user";
import { AuthUser } from "app/services/api/user";
import { useState } from "react";

export default function LogoutButton() {
	const [loading, setLoading] = useState(false);
	const clearUserData = useUser((s) => s.clearUserData);
	const fetcher = useFetcher();

	const onLogout = async () => {
		setLoading(true);

		const { data, error } = await AuthUser.logout();

		if (data && !error) {
			clearUserData();

			userClientSession.clearAccessToken();

			fetcher.load("/");
		} else {
			showNotification({
				title: "Logout Gagal",
				message: "Server sedang tidak stabil, silahkan coba lagi",
				color: "red",
			});
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
