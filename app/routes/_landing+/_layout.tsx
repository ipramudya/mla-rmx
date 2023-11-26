import { Box } from "@mantine/core";
import { Outlet } from "@remix-run/react";
import useHeader from "app/hooks/useHeader";
import Header from "app/routes/_landing+/components/Header";

export default function LandingLayoyt() {
	const { isOver } = useHeader();

	return (
		<>
			<Box
				style={{
					zIndex: 99,
					transition: "background 0.3s ease",
					borderBottom: isOver ? "1px solid var(--mantine-color-gray-3)" : "unset",
				}}
				pos="sticky"
				component="header"
				bg={isOver ? "white" : "transparent"}
				top={0}
				left={0}
			>
				<Header />
			</Box>
			<Outlet />
		</>
	);
}
