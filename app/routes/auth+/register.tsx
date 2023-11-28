import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Stack, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterPage() {
	const { handleSubmit, register, formState } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	});

	const handleFormSubmit = async (fields: z.infer<typeof formSchema>) => {
		console.log("fields", fields);
	};

	return (
		<>
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

const formSchema = z.object({
	email: z.string().email({ message: "Email tidak valid" }),
});
