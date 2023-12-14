export interface OrganizerAccounts {
	id: string;
	name: string;
	username: string;
	email_address: string;
	is_locked: boolean;
	is_active: boolean;
	is_favorite: boolean;
	created_at: number;
	updated_at: number;
	logout_at: number | null;
	user_id: string;
	total_event: number;
	background: OrganizerBackground;
	profile: OrganizerProfile;
}

interface OrganizerBackground {
	publicId: string;
	secureUrl: string;
}

interface OrganizerProfile {
	publicId: string;
	secureUrl: string;
}
