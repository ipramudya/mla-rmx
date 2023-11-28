import { protectedServiceHandler, serviceHandler } from "app/services";

type RegisterParam = {
	firstName: string;
	lastName: string;
	password: string;
	phone: string;
};

type LoginParam = {
	email: string;
	password: string;
};

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

export default class AuthUser {
	public static async login(payload: LoginParam) {
		return await serviceHandler<LoginResponse>("/auth/user/login", {
			method: "POST",
			body: JSON.stringify(payload),
			credentials: "include",
		});
	}

	public static async register({ firstName, lastName, phone, password }: RegisterParam) {
		return await serviceHandler("/auth/user/register", {
			method: "POST",
			body: JSON.stringify({
				full_name: firstName + lastName,
				phone_number: phone,
				password: password,
			}),
			credentials: "include",
		});
	}

	public static async sendMagicLink(email: string) {
		return await serviceHandler("/auth/check-availability-email", {
			method: "POST",
			body: JSON.stringify({ email }),
			credentials: "include",
		});
	}

	public static async logout() {
		return await protectedServiceHandler("/auth/user/logout", {
			method: "POST",
		});
	}

	public static async refreshAccessToken(cookie?: string) {
		return await serviceHandler<{ access_token: string }>("/auth/refresh", {
			method: "POST",
			credentials: "include",
			...(cookie ? { headers: { Cookie: cookie } } : undefined),
		});
	}
}
