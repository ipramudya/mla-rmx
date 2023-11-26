import { Button, Input, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";

export default function RegisterPage() {
	return (
		<>
			<div style={{ textAlign: "center" }}>
				<Text component="h4" fz={24} mb={4} fw={600}>
					Halo, Selamat Bergabung!
				</Text>
				<Text size="sm">Daftarkan diri kamu untuk akses seluruh fitur tanpa batas</Text>
			</div>
			<Input.Wrapper label="Email">
				<Input
					size="md"
					leftSection={<Icon.Email size={20} />}
					placeholder="Masukan email kamu..."
				/>
			</Input.Wrapper>
			<Button variant="gradient">Lanjutkan</Button>
		</>
	);
}
