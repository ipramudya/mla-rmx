import { Box, Button, Center, Divider, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { Icon } from "app/components/Icon";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");

	if (cookieHeader) return redirect("/", 301);

	return null;
}

export default function AuthLayout() {
	const { pathname } = useLocation();
	const currentPath = pathname.split("/").pop() as "register" | "login";

	return (
		<Center miw="100%" mih="100dvh" pos="relative">
			<Box component={Link} to="/">
				<Title
					fz={32}
					c="black"
					pos="absolute"
					top="1rem"
					left="50%"
					style={{ transform: "translateX(-50%)" }}
				>
					mulai
					<Text fz={32} component="span">
						lomba
					</Text>
				</Title>
			</Box>
			<Stack gap="xl" miw={{ lg: 400 }} maw={{ base: 342, lg: "100%" }}>
				{/* login or register form */}
				<Outlet />

				<Divider variant="dashed" label="Atau melalui" />
				<SimpleGrid spacing="lg" cols={2}>
					<Button
						fullWidth
						leftSection={
							<Icon.Google size={20} color="var(--mantine-color-indigo-6)" />
						}
					>
						Google
					</Button>
					<Button
						fullWidth
						leftSection={
							<Icon.Facebook size={20} color="var(--mantine-color-indigo-6)" />
						}
					>
						Facebook
					</Button>
				</SimpleGrid>
				<Group justify="center" gap={4}>
					<Text component="span" size="sm">
						{currentPath === "login" ? "Belum" : "Sudah"} punya akun?
					</Text>
					<Text
						component={Link}
						to={`/auth/${currentPath === "login" ? "register" : "login"}`}
						fw={600}
						c="indigo.6"
					>
						{currentPath === "login" ? "Daftar" : "Masuk"}
					</Text>
				</Group>
			</Stack>
		</Center>
	);
}
