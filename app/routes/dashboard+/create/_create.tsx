import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, PasswordInput, Stack, Switch, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import createOrganizer from "./api-create-organizer";
import CreateOrganizerLayout from "./components/CreateOrganizerLayout";
import styles from "./components/Switch.module.css";
import type { CreateOrganizerPayload } from "./create-organizer-schema";
import { createOrganizerSchema } from "./create-organizer-schema";

export default function Create() {
	const navigate = useNavigate();

	const { handleSubmit, register, unregister, formState, resetField, watch } =
		useForm<CreateOrganizerPayload>({
			resolver: zodResolver(createOrganizerSchema),
			defaultValues: {
				email: "",
				name: "",
				isLocked: undefined,
				password: undefined,
			},
		});

	const handleFormSubmit = async (fields: CreateOrganizerPayload) => {
		const { error, data } = await createOrganizer(fields);

		if (error) {
			showNotification({
				title: "Proses Gagal",
				message: `Gagal membuat organizer, ${error}`,
				color: "red",
			});
			return;
		}

		showNotification({
			title: "Berhasil",
			message: "Selamat, organizer baru berhasil ditambahkan",
			color: "green",
		});
		navigate(-1);
		console.log("data", data);
	};

	useEffect(() => {
		if (!watch("isLocked")) {
			unregister("password");
			resetField("password");
		}
	}, [resetField, unregister, watch]);

	return (
		<CreateOrganizerLayout>
			<div style={{ textAlign: "center" }}>
				<Text component="h4" fz={24} mb={4} fw={600}>
					Halo, Penyelenggara Kreatif!
				</Text>
				<Text size="sm">
					Jangkau pelajar bertalenta untuk meningkatkan produktifitas organisasi
				</Text>
			</div>

			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Stack gap="xl">
					<Stack>
						<Input.Wrapper
							label="Nama Organizer"
							error={formState.errors.name?.message || false}
							withAsterisk
						>
							<Input
								error={!!formState.errors.name}
								size="md"
								leftSection={<Icon.Text size={20} />}
								placeholder="Masukan nama organizer"
								{...register("name")}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label="Email Organizer"
							error={formState.errors.email?.message || false}
							withAsterisk
						>
							<Input
								error={!!formState.errors.email}
								size="md"
								leftSection={<Icon.Email size={20} />}
								placeholder="Masukan email organizer"
								{...register("email")}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label="Privasi Organizer"
							description="Batasi akses organizer agar lebih aman (opsional)"
							error={formState.errors.isLocked?.message || false}
							classNames={{ root: styles.input_wrapper }}
						>
							<Switch
								classNames={{ root: styles.switch }}
								styles={{ track: { cursor: "pointer" } }}
								label={false}
								size="md"
								error={!!formState.errors.isLocked}
								{...register("isLocked")}
							/>
						</Input.Wrapper>

						{watch("isLocked") && (
							<Input.Wrapper
								label="Password Organizer"
								error={formState.errors.password?.message || false}
								withAsterisk
							>
								<PasswordInput
									error={!!formState.errors.password}
									size="md"
									leftSection={<Icon.Password size={20} />}
									placeholder="Masukan password organizer"
									{...register("password")}
								/>
							</Input.Wrapper>
						)}
					</Stack>

					<Button type="submit" variant="gradient" loading={formState.isSubmitting}>
						Buat Organizer
					</Button>
				</Stack>
			</form>
		</CreateOrganizerLayout>
	);
}
