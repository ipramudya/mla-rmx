import { APP_STATIC_URL } from "app/constant";
import { generateNumber } from "app/functions/number";
import protectedAPIHandler from "app/functions/protected-api-handler";
import type { CreateOrganizerPayload } from "../utils/create-organizer-schema";

const generateBannerImg = async () => {
	const getRandomNumber = generateNumber(1, 4);
	const res = await fetch(`${APP_STATIC_URL}/banner/banner_organizer${getRandomNumber}.jpg`);
	return res.blob();
};

const generateProfileImg = async () => {
	const getRandomNumber = generateNumber(1, 5);
	const res = await fetch(`${APP_STATIC_URL}/profile/Avatar${getRandomNumber}.jpg`);
	return res.blob();
};

export default async function createOrganizer({
	email,
	name,
	isLocked = false,
	password = null,
}: CreateOrganizerPayload) {
	const [banner, profile] = await Promise.all([generateBannerImg(), generateProfileImg()]);

	const formData = new FormData();

	formData.append("email", email);
	formData.append("name", name);
	formData.append("background", banner, `${email}-${name}-background.jpg`);
	formData.append("profile", profile, `${email}-${name}-profile.jpg`);
	formData.append("is_locked", isLocked ? "true" : "false");

	if (password) {
		formData.append("password", password);
	}

	return await protectedAPIHandler("/auth/organizer/register", {
		method: "POST",
		body: formData,
	});
}
