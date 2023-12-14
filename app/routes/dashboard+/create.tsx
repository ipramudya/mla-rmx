import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, PasswordInput, Stack, Switch, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import createOrganizer from "app/modules/organizer/api/create-organizer";
import CreateOrganizerLayout from "app/modules/organizer/components/CreateOrganizer/CreateOrganizerLayout";
import styles from "app/modules/organizer/components/CreateOrganizer/Switch.module.css";
import useListOrganizers from "app/modules/organizer/hooks/use-list-organizers";
import type { CreateOrganizerPayload } from "app/modules/organizer/utils/create-organizer-schema";
import { createOrganizerSchema } from "app/modules/organizer/utils/create-organizer-schema";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_FORM_VALUES = { email: "", name: "" };

export default function CreatePage() {
	const navigate = useNavigate();
	const { refetch } = useListOrganizers();

	const { handleSubmit, register, unregister, formState, resetField, watch } =
		useForm<CreateOrganizerPayload>({
			resolver: zodResolver(createOrganizerSchema),
			defaultValues: DEFAULT_FORM_VALUES,
		});

	const handleFormSubmit = async (fields: CreateOrganizerPayload) => {
		const { error } = await createOrganizer(fields);

		if (error) {
			toast.error("Proses Gagal", {
				description: `Gagal membuat organizer, ${error}`,
			});
			return;
		}

		toast.success("Berhasil", {
			description: "Selamat, organizer baru berhasil ditambahkan",
		});
		refetch();
		navigate("/dashboard/choose");
	};

	const unsetPasswordFild = useCallback(() => {
		const organizerLocked = watch("isLocked");

		if (!organizerLocked) {
			unregister("password");
			resetField("password");
		}
	}, [resetField, unregister, watch]);

	useEffect(() => {
		unsetPasswordFild();
	}, [unsetPasswordFild]);

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
