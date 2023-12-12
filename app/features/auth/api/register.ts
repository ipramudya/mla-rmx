import publicAPIHandler from "app/functions/public-api-handler";
import type { FillPayload } from "../utils/fill-schema";

export default async function register({
	firstName,
	lastName,
	phone,
	password,
}: Omit<FillPayload, "accepted">) {
	return await publicAPIHandler("/auth/user/register", {
		method: "POST",
		body: JSON.stringify({
			full_name: firstName + lastName,
			phone_number: phone,
			password,
		}),
		credentials: "include",
	});
}
