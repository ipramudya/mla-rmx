import { zodResolver } from "@hookform/resolvers/zod";
import type { ModalProps } from "@mantine/core";
import { Button, CloseButton, Flex, Input, Modal, PasswordInput, Stack, Text } from "@mantine/core";
import { Icon } from "app/components/Icon";
import { useForm } from "react-hook-form";
import type { LoginPopupPayload } from "./login-popup-schema";
import { loginPopupSchema } from "./login-popup-schema";

interface Props extends Omit<ModalProps, "children"> {
	name: string;
}

export default function LoginPopup({ name, opened, onClose, ...props }: Props) {
	const { handleSubmit, register, formState } = useForm<LoginPopupPayload>({
		resolver: zodResolver(loginPopupSchema),
		defaultValues: { password: "" },
	});

	const handleFormSubmit = async (fields: LoginPopupPayload) => {
		console.log("fields", fields);
	};

	return (
		<Modal opened={opened} onClose={onClose} centered withCloseButton={false} {...props}>
			<Stack>
				<Flex align="center" justify="space-between">
					<div>
						<Text fw={600}>Masuk Dashboard</Text>
						<Text size="sm" maw="90%">
							Penggunaan akses akun {name} dibatasi, silahkan login dulu.
						</Text>
					</div>
					<CloseButton variant="subtle" size="sm" onClick={onClose} />
				</Flex>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<Stack>
						<Input.Wrapper
							label="Password"
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
						<Button type="submit" variant="gradient" loading={formState.isSubmitting}>
							Masuk
						</Button>
					</Stack>
				</form>
			</Stack>
		</Modal>
	);
}
