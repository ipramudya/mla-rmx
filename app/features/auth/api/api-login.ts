import publicAPIHandler from "app/functions/public-api-handler";
import type { LoginPayload } from "../utils/login-schema";

type LoginResponse = {
	access_token: string;
	identity: {
		id: string;
		full_name: string;
		phone_number: string;
		email_address: string;
		is_active: boolean;
		created_at: number;
		updated_at: number;
	};
};

export default async function login(payload: LoginPayload) {
	return await publicAPIHandler<LoginResponse>("/auth/user/login", {
		method: "POST",
		body: JSON.stringify(payload),
		credentials: "include",
	});
}
