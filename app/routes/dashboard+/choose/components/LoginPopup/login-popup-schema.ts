import { z } from "zod";

export const loginPopupSchema = z.object({
	password: z.string().min(8, { message: "Password tidak valid" }),
});

export type LoginPopupPayload = z.infer<typeof loginPopupSchema>;
