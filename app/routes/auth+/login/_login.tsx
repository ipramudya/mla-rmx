import { Button, Input, PasswordInput, Stack, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function LoginPage() {
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
			<Stack>
				<Input.Wrapper label="Email">
					<Input
						size="md"
						leftSection={<Icon.Email size={20} />}
						placeholder="Masukan email kamu..."
					/>
				</Input.Wrapper>
				<Input.Wrapper label="Password">
					<PasswordInput
						size="md"
						leftSection={<Icon.Password size={20} />}
						placeholder="Masukan password kamu..."
					/>
				</Input.Wrapper>
			</Stack>
			<Button variant="gradient">Masuk</Button>
		</>
	);
}
