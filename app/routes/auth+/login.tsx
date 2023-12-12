import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, PasswordInput, Stack, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import login from "app/features/auth/api/api-login";
import type { LoginPayload } from "app/features/auth/utils/login-schema";
import { loginFormSchema } from "app/features/auth/utils/login-schema";
import { userClientSession } from "app/lib/session";
import useUser from "app/lib/store/hooks/use-user";
import { useForm } from "react-hook-form";

export default function LoginPage() {
	const navigate = useNavigate();
	const setUser = useUser((s) => s.setUserData);

	const { handleSubmit, register, formState, setError } = useForm<LoginPayload>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	/* warn error to the input field */
	const warnError = (fields: LoginPayload): void => {
		for (const field in fields) {
			setError(field as keyof LoginPayload, {
				type: "custom",
				message: "Data yang anda masukan belum terdaftar",
			});
		}
	};

	const handleFormSubmit = async (fields: LoginPayload) => {
		const { data, error } = await login(fields);

		if (error && !data) warnError(fields);

		if (data) {
			userClientSession.setAccessToken(data.access_token);
			setUser(data.identity);
			navigate("/");
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
							withAsterisk
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
							withAsterisk
							styles={{
								root: {
									position: "relative",
								},
							}}
						>
							<PasswordInput
								error={!!formState.errors.password}
								size="md"
								leftSection={<Icon.Password size={20} />}
								placeholder="Masukan password kamu..."
								{...register("password")}
							/>
							<Text
								size="xs"
								variant="body-text"
								pos="absolute"
								top={8}
								right={0}
								lh={1}
							>
								Lupa password ?
							</Text>
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
