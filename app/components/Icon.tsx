import type { Icon as IconsaxIcon, IconProps } from "iconsax-react";
import {
	AddCircle,
	AddSquare,
	ArrowDown,
	ArrowDown2,
	ArrowLeft,
	ArrowLeft2,
	ArrowRight,
	ArrowRight2,
	ArrowUp,
	ArrowUp2,
	Calendar2,
	Danger,
	Edit2,
	Eye,
	EyeSlash,
	Gallery,
	Heart,
	Information,
	Key,
	Location,
	Lock,
	Logout,
	MedalStar,
	MessageAdd1,
	MessageQuestion,
	MoneyRecive,
	More,
	People,
	SearchNormal1,
	SearchStatus,
	Setting2,
	Setting4,
	Sms,
	Trash,
	User,
	UserSquare,
	Wallet,
} from "iconsax-react";

export const Icon = {
	ArrowUp,
	ArrowRight,
	ArrowDown,
	ArrowLeft,
	Calendar: Calendar2,
	ChevUp: ArrowUp2,
	ChevRight: ArrowRight2,
	ChevDown: ArrowDown2,
	ChevLeft: ArrowLeft2,
	Delete: Trash,
	Edit: Edit2,
	Email: Sms,
	Error: Danger,
	Ellipsis: More,
	Feedback: MessageAdd1,
	Filter: Setting4,
	Finance: MoneyRecive,
	Gear: Setting2,
	Heart,
	Help: MessageQuestion,
	History: SearchStatus,
	Key: Key,
	Hide: EyeSlash,
	Info: Information,
	Image: Gallery,
	Lomba: MedalStar,
	Logout,
	Location,
	Organizer: People,
	Password: Lock,
	PlusCircle: AddCircle,
	PlusSquare: AddSquare,
	Reveal: Eye,
	Search: SearchNormal1,
	User,
	UserSquare,
	Wallet,

	// manual
	Facebook: ({ size = 16, ...props }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 128 128"
			{...props}
		>
			<rect
				width="118.35"
				height="118.35"
				x="4.83"
				y="4.83"
				fill="#3d5a98"
				rx="6.53"
				ry="6.53"
			/>
			<path
				fill="#fff"
				d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
			/>
		</svg>
	),
	Google: ({ size = 16, ...props }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 128 128"
			{...props}
		>
			<path
				fill="#fff"
				d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z"
			/>
			<path
				fill="#e33629"
				d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z"
			/>
			<path
				fill="#f8bd00"
				d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z"
			/>
			<path
				fill="#587dbd"
				d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
			/>
			<path
				fill="#319f43"
				d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z"
			/>
		</svg>
	),
	Certificate: ({ size = 16 }: IconProps) => (
		<svg
			width={size}
			height={size}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			className="lucide lucide-file-badge"
		>
			<path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-6" />
			<polyline points="14 2 14 8 20 8" />
			<path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
			<path d="M7 16.5 8 22l-3-1-3 1 1-5.5" />
		</svg>
	),
	FollowedLomba: ({ size = 16 }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			className="lucide lucide-calendar-heart"
		>
			<path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7" />
			<path d="M16 2v4" />
			<path d="M8 2v4" />
			<path d="M3 10h18" />
			<path d="M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z" />
		</svg>
	),
	LovedOrganizer: ({ size = 16 }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			className="lucide lucide-heart-handshake"
		>
			<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
			<path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
			<path d="m18 15-2-2" />
			<path d="m15 18-2-2" />
		</svg>
	),
};

export type Icon = IconsaxIcon;
export type IconKeys = keyof typeof Icon;
