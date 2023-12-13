import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, NumberInput, PasswordInput, Stack, Text } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { Icon } from "app/components/Icon";
import { APP_API_URL } from "app/constant";
import apiRegister from "app/features/auth/api/register";
import type { FillPayload } from "app/features/auth/utils/fill-schema";
import { fillFormSchema } from "app/features/auth/utils/fill-schema";
import { parseCookie } from "app/functions/parse-cookie.server";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_FORM_VALUES = { firstName: "", lastName: "", password: "", phone: "" };

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	if (!cookieHeader) return redirect("/auth/login");

	const verified = parseCookie(cookieHeader);
	if (!verified) return redirect("/auth/register");

	return null;
}

export default function FillPage() {
	const navigate = useNavigate();
	const fetcher = useFetcher();

	const { handleSubmit, formState, register } = useForm<FillPayload>({
		resolver: zodResolver(fillFormSchema),
		defaultValues: DEFAULT_FORM_VALUES,
	});

	const triggerRuntimeLoaders = (): void => {
		/* call runtime remix api to destroy cookie, you can found this on app/routes/api+ directory */
		fetch(APP_API_URL + "/clear-unused-auth-cookie", {
			credentials: "include",
		});

		/* trigger runtime and client side effects on root layout */
		fetcher.load("/");
	};

	const handleFormSubmit = async ({ accepted, ...fields }: FillPayload) => {
		const { error } = await apiRegister(fields);

		if (error) {
			toast.error("Error", {
				description: error,
			});
			throw new Error(error);
		} else {
			triggerRuntimeLoaders();

			toast.success("Berhasil", {
				description: "Selamat, anda berhasil membuat akun baru",
			});

			navigate("/");
		}
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
							{...register("firstName")}
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
							{...register("lastName")}
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
							{...(register("phone") as any)}
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
							{...register("password")}
						/>
					</Input.Wrapper>
					<Checkbox
						error={!!formState.errors.accepted}
						label="Menyetujui segala ketentuan dan kebijakan kami"
						{...register("accepted")}
					/>
					<Button type="submit" variant="gradient" loading={formState.isSubmitting}>
						Buat Akun
					</Button>
				</Stack>
			</form>
		</>
	);
}
