import protectedAPIHandler from "app/functions/protected-api-handler";

type LoginResponse = {
	access_token: string;
	identity: {
		id: string;
		name: string;
		username: string;
		profile: null;
		background: null;
		email_address: string;
		is_locked: boolean;
		is_active: boolean;
		created_at: number;
		updated_at: number;
		user_id: string;
	};
};

type Params = {
	organizerId: string;
	password?: string;
};

export default async function loginOrganizer({ organizerId, password }: Params) {
	return await protectedAPIHandler<LoginResponse>("/auth/organizer/login", {
		method: "POST",
		body: { id: organizerId, password },
	});
}
