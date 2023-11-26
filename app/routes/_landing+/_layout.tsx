import { Box } from "@mantine/core";
import { Outlet } from "@remix-run/react";
import Header from "app/routes/_landing+/components/Header";

export default function LandingLayoyt() {
	return (
		<>
			<Box style={{ zIndex: 10 }} pos="sticky" bg="transparent" top={0} left={0}>
				<Header />
			</Box>
			<Outlet />
		</>
	);
}
