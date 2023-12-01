import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Input, Stack, Text } from "@mantine/core";
import { useSearchParams } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import sendMagicLink from "./api-register";
import type { RegisterPayload } from "./register-schema";
import { registerFormSchema } from "./register-schema";

const icon = <Icon.Info size={20} />;

export default function RegisterPage() {
	const [isEmailSent, setIsEmailSent] = useState(false);
	const [searchParams] = useSearchParams();

	const { handleSubmit, register, formState, setError } = useForm<RegisterPayload>({
		resolver: zodResolver(registerFormSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	});

	const handleFormSubmit = async (fields: RegisterPayload) => {
		const { error } = await sendMagicLink(fields.email);

		if (error) {
			setError(
				"email",
				{
					type: "custom",
					message: "Server sedang tidak stabil",
				},
				{ shouldFocus: true },
			);
		}

		setIsEmailSent(true);
	};

	useEffect(() => {
		const err = searchParams.get("error");

		if (err) {
			setError("email", {
				type: "custom",
				message: "Link yang anda gunakan sudah tidak valid",
			});
		}
	}, [searchParams, setError]);

	return (
		<>
			{isEmailSent && (
				<Box pos="absolute" top="15%">
					<Alert
						variant="light"
						color="violet"
						title="Kode Terkirim"
						icon={icon}
						maw={400}
						withCloseButton
						onClose={() => setIsEmailSent(false)}
					>
						Kami baru saja mengirimi Anda link konfirmasi. Silakan periksa kotak masuk
						Anda
					</Alert>
				</Box>
			)}
			<div style={{ textAlign: "center" }}>
				<Text component="h4" fz={24} mb={4} fw={600}>
					Halo, Selamat Bergabung!
				</Text>
				<Text size="sm">Daftarkan diri kamu untuk akses seluruh fitur tanpa batas</Text>
			</div>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Stack gap="lg">
					<Input.Wrapper label="Email" error={formState.errors.email?.message || false}>
						<Input
							error={!!formState.errors.email}
							size="md"
							leftSection={<Icon.Email size={20} />}
							placeholder="Masukan email kamu..."
							{...register("email")}
						/>
					</Input.Wrapper>
					<Button type="submit" variant="gradient" loading={formState.isSubmitting}>
						Lanjutkan
					</Button>
				</Stack>
			</form>
		</>
	);
}
