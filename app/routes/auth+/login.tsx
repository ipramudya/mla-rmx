import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, PasswordInput, Stack, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
	const { handleSubmit, register, formState } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleFormSubmit = async (fields: z.infer<typeof formSchema>) => {
		console.log("fields", fields);
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
