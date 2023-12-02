import type { AxiosRequestConfig } from "axios";

export interface ParticipantUser {
	id: string;
	full_name: string;
	email_address: string;
	phone_number: string;
	is_active: boolean;
	created_at: number;
	updated_at: number;
}

export interface OrganizerUser {
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
}

export interface OrganizerAccounts {
	id: string;
	name: string;
	profile: null;
	background: null;
	username: string;
	email_address: string;
	is_locked: boolean;
	is_active: boolean;
	created_at: number;
	updated_at: number;
	logout_at: number | null;
	user_id: string;
}

export declare interface BaseAPIReturn<T> {
	data: T | null;
	error: string | null;
	ctx: AxiosRequestConfig | null;
}
