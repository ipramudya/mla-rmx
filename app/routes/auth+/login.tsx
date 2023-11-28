import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, PasswordInput, Stack, Text } from "@mantine/core";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { SERVER_ACCESS_TOKEN, serverAccessToken } from "app/lib/cookie.server";
import Tokenizing from "app/lib/token/tokenizing";
import AuthUser from "app/services/api/user/AuthUser";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const accessToken = body.get("s_at");

	return redirect("/", {
		headers: {
			"Set-Cookie": await serverAccessToken.serialize({
				[SERVER_ACCESS_TOKEN]: accessToken,
			}),
		},
	});
};

export default function LoginPage() {
	const fetcher = useFetcher();
	const { handleSubmit, register, formState, setError } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleFormSubmit = async (fields: z.infer<typeof formSchema>) => {
		const { data, error } = await AuthUser.login(fields);

		if (error && !data) {
			for (const key in fields) {
				// @ts-expect-error unhandled constraint key
				setError(key, {
					type: "custom",
					message: "Data yang anda masukan belum terdaftar",
				});
			}
			return;
		}

		if (data) {
			Tokenizing.setAccessToken(data.access_token);
			fetcher.submit({ s_at: data.access_token }, { method: "POST", action: "/auth/login" });
		}
	};

	return (
		<>
			<div style={{ textAlign: "center" }}>
				<Text component="h4" fz={24} mb={4} fw={600}>
					Halo, Selamat Datang!
				</Text>
				<Text size="sm">
					Masuk sekarang juga dan akses seluruh fitur melalui akun pribadi kamu
				</Text>
			</div>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Stack gap="lg">
					<Stack>
						<Input.Wrapper
							label="Email"
							error={formState.errors.email?.message || false}
						>
							<Input
								error={!!formState.errors.email}
								size="md"
								leftSection={<Icon.Email size={20} />}
								placeholder="Masukan email kamu..."
								{...register("email")}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label="Password"
							error={formState.errors.password?.message || false}
						>
							<PasswordInput
								error={!!formState.errors.password}
								size="md"
								leftSection={<Icon.Password size={20} />}
								placeholder="Masukan password kamu..."
								{...register("password")}
							/>
						</Input.Wrapper>
					</Stack>
					<Button type="submit" variant="gradient" loading={formState.isSubmitting}>
						Masuk
					</Button>
				</Stack>
			</form>
		</>
	);
}

const formSchema = z.object({
	email: z.string().email({ message: "Email tidak valid" }),
	password: z.string().min(8, { message: "Password tidak valid" }),
});