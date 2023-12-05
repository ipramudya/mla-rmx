import { zodResolver } from "@hookform/resolvers/zod";
import type { ModalProps } from "@mantine/core";
import { Button, CloseButton, Flex, Input, Modal, PasswordInput, Stack, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import { useForm } from "react-hook-form";
import loginOrganizer from "../../api-login-organizer";
import usePopupLogin from "../../use-popup-login";
import type { LoginPopupPayload } from "./login-popup-schema";
import { loginPopupSchema } from "./login-popup-schema";

interface Props extends Omit<ModalProps, "children"> {
	name: string;
}

export default function LoginPopup({ name, opened, onClose, ...props }: Props) {
	const navigate = useNavigate();
	const setCurrentOrgs = useOrganizer((s) => s.setCurrentOrgs);
	const { popup, resetPopup } = usePopupLogin();

	const { handleSubmit, register, formState, setError } = useForm<LoginPopupPayload>({
		resolver: zodResolver(loginPopupSchema),
		defaultValues: { password: "" },
	});

	const handleFormSubmit = async ({ password }: LoginPopupPayload) => {
		const { data, error } = await loginOrganizer({ organizerId: popup.id, password });

		if (error || !data) {
			setError("password", {
				type: "custom",
				message: "Password yang anda masukan salah",
			});
			return;
		}

		orgsClientSession.setAccessToken(data.access_token);
		setCurrentOrgs(data.identity);
		navigate(`/dashboard/${data.identity.username}`);
		resetPopup();
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
