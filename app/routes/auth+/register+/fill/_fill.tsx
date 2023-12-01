import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, NumberInput, PasswordInput, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useFetcher, useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { APP_API_URL } from "app/constant";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import register from "./api-register";
import type { FillPayload } from "./fill-schema";
import { fillFormSchema } from "./fill-schema";

export default function FillPage() {
	const navigate = useNavigate();
	const fetcher = useFetcher();

	const {
		handleSubmit,
		formState,
		getValues,
		register: formRegister,
	} = useForm<FillPayload>({
		resolver: zodResolver(fillFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			password: "",
			phone: "",
		},
	});

	useEffect(() => {
		console.log(123, formState);
		console.log("va", getValues());
	}, [formState, getValues]);

	const handleFormSubmit = async ({ accepted, ...fields }: FillPayload) => {
		const { error } = await register(fields);

		if (error) {
			showNotification({
				title: "Error",
				message: error,
				color: "red",
			});
			throw new Error(error);
		}

		fetch(APP_API_URL + "/clear-unused-auth-cookie", {
			credentials: "include",
		});
		showNotification({
			title: "Berhasil",
			message: "Selamat, anda berhasil membuat akun baru",
			color: "green",
		});
		fetcher.load("/");
		navigate("/");
	};

	return (
		<>
			<div style={{ textAlign: "center" }}>
				<Text component="h4" fz={24} mb={4} fw={600}>
					Halo, Pengguna Baru!
				</Text>
				<Text size="sm">Silahkan penuhi informasi berikut untuk membuat akun baru</Text>
			</div>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Stack gap="lg">
					<Input.Wrapper
						label="Nama Depan"
						error={formState.errors.firstName?.message || false}
						withAsterisk
					>
						<Input
							error={!!formState.errors.firstName}
							size="md"
							leftSection={<Icon.Text size={20} />}
							placeholder="masukan nama depan"
							{...formRegister("firstName")}
						/>
					</Input.Wrapper>
					<Input.Wrapper
						label="Nama Belakang"
						error={formState.errors.lastName?.message || false}
						withAsterisk
					>
						<Input
							error={!!formState.errors.lastName}
							size="md"
							leftSection={<Icon.Text size={20} />}
							placeholder="masukan nama belakang"
							{...formRegister("lastName")}
						/>
					</Input.Wrapper>
					<Input.Wrapper
						label="Telepon"
						error={formState.errors.phone?.message || false}
						withAsterisk
					>
						<NumberInput
							error={!!formState.errors.phone}
							size="md"
							leftSection={<Icon.Call size={20} />}
							placeholder="masukan nomor telepon"
							hideControls
							prefix="+"
							{...(formRegister("phone") as any)}
						/>
					</Input.Wrapper>
					<Input.Wrapper
						label="Password"
						error={formState.errors.password?.message || false}
						withAsterisk
					>
						<PasswordInput
							error={!!formState.errors.password}
							size="md"
							leftSection={<Icon.Password size={20} />}
							placeholder="masukan password"
							{...formRegister("password")}
						/>
					</Input.Wrapper>
					<Checkbox
						error={!!formState.errors.accepted}
						label="Menyetujui segala ketentuan dan kebijakan kami"
						{...formRegister("accepted")}
					/>
					<Button type="submit" variant="gradient" loading={formState.isSubmitting}>
						Buat Akun
					</Button>
				</Stack>
			</form>
		</>
	);
}
