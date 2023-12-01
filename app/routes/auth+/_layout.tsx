import { Box, Button, Center, Divider, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { parseCookie } from "app/functions/parse-cookie.server";
import { CLIENT_SESSION_ACCESS_TOKEN } from "app/lib/session";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	if (!cookieHeader) return null;

	const parsedCookie = parseCookie(cookieHeader);

	if (parsedCookie.refresh_token || parsedCookie[CLIENT_SESSION_ACCESS_TOKEN]) {
		return redirect("/", 301);
	}

	return null;
}

export default function AuthLayout() {
	const { pathname } = useLocation();
	const currentPath = pathname.split("/").pop() as "register" | "login" | "fill";
	const isFillPage = currentPath === "fill";

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

				{/* ignored if /auth/register/fill page */}
				{!isFillPage ? (
					<>
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
									<Icon.Facebook
										size={20}
										color="var(--mantine-color-indigo-6)"
									/>
								}
							>
								Facebook
							</Button>
						</SimpleGrid>
						<Group justify="center" gap={4}>
							<Text component="span" size="sm" variant="body-text">
								{currentPath === "login" ? "Belum" : "Sudah"} punya akun?
							</Text>
							<Text
								component={Link}
								to={`/auth/${currentPath === "login" ? "register" : "login"}`}
								fw={600}
								size="sm"
								variant="body-text"
							>
								{currentPath === "login" ? "Daftar" : "Masuk"}
							</Text>
						</Group>
					</>
				) : (
					false
				)}
			</Stack>
		</Center>
	);
}
