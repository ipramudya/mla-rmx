import { Outlet } from "@remix-run/react";
import useIsClient from "app/hooks/use-is-client";
import Base from "app/modules/organizer/components/Dashboard/Layout/Base";
import DashboardLayoutSkeleton from "app/modules/organizer/components/Dashboard/Layout/DashboardLayoutSkeleton";

export default function Layout() {
	const isClient = useIsClient();

	return isClient ? (
		<Base>
			<Outlet />
		</Base>
	) : (
		<DashboardLayoutSkeleton />
	);
}
