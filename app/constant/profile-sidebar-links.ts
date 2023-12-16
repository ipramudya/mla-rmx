import type { IconKeys } from "app/components/Icon";

type ProfileSidebarLinks = {
	title: string;
	subtitles: {
		text: string;
		icon: IconKeys;
		isDisabled?: boolean;
	}[];
}[];

const PROFILE_SIDEBAR_LINKS: ProfileSidebarLinks = [
	{
		title: "Kelola Informasi Pengguna",
		subtitles: [
			{ text: "Informasi pribadi", icon: "UserSquare" },
			{ text: "Pengaturan akun", icon: "Gear" },
			{ text: "Keuangan", icon: "Finance", isDisabled: true },
		],
	},
	{
		title: "Minat & Ketertarikan",
		subtitles: [
			{ text: "Lomba diikuti", icon: "FollowedLomba" },
			{ text: "Sertifikat pencapaian", icon: "Gear" },
			{ text: "Wishlist", icon: "Heart" },
			{ text: "Organizer disukai", icon: "LovedOrganizer" },
		],
	},
	{
		title: "Riwayat Pencarian",
		subtitles: [
			{ text: "Riwayat Pencarian", icon: "History" },
			{ text: "Baru saja dilihat", icon: "Reveal" },
		],
	},
	{
		title: "Bantuan & Dukungan",
		subtitles: [
			{ text: "Pusat bantuan dan kebijakan", icon: "Help" },
			{ text: "Tentang MulaiLomba", icon: "Info" },
			{ text: "Wishlist", icon: "Heart" },
			{ text: "Saran dan masukan", icon: "Feedback" },
		],
	},
];

export default PROFILE_SIDEBAR_LINKS;
