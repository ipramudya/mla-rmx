import { zodResolver } from "@hookform/resolvers/zod";
import type { ModalProps } from "@mantine/core";
import { Button, CloseButton, Flex, Input, Modal, PasswordInput, Stack, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { orgsClientSession } from "app/lib/session/organizer-session";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import loginOrganizer from "app/modules/organizer/api/login-organizer";
import usePopupLogin from "app/modules/organizer/hooks/use-popup-login";
import { useForm } from "react-hook-form";
import type { LoginPopupPayload } from "../../../utils/login-popup-schema";
import { loginPopupSchema } from "../../../utils/login-popup-schema";

const FORM_DEFAULT_VALUES = { password: "" };

type Props = Omit<ModalProps, "children" | "opened" | "onClose">;

export default function LoginPopup(props: Props) {
	const navigate = useNavigate();
	const setCurrentOrgs = useOrganizer((s) => s.setCurrentOrgs);
	const { popup, resetPopup } = usePopupLogin();

	const { handleSubmit, register, formState, setError } = useForm<LoginPopupPayload>({
		resolver: zodResolver(loginPopupSchema),
		defaultValues: FORM_DEFAULT_VALUES,
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

		navigate(`/dashboard/${data.identity.id}`);

		resetPopup();
	};

	/* unmount this component when popup state is false */
	if (!popup.show) return false;

	return (
		<Modal
			opened={popup.show}
			onClose={() => resetPopup()}
			centered
			withCloseButton={false}
			{...props}
		>
			<Stack>
				<Flex justify="space-between">
					<div>
						<Text fw={600}>Masuk Dashboard</Text>
						<Text size="sm" maw="90%">
							Penggunaan akses akun {popup.name} dibatasi, silahkan login dulu.
						</Text>
					</div>
					<CloseButton variant="subtle" size="sm" onClick={() => resetPopup()} />
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
