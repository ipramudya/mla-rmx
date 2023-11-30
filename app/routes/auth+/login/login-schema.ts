import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Email tidak valid" }),
	password: z.string().min(8, { message: "Password tidak valid" }),
});

export type LoginPayload = z.infer<typeof loginFormSchema>;
