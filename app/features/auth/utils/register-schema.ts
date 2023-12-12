import { z } from "zod";

export const registerFormSchema = z.object({
	email: z.string().email({ message: "Email tidak valid" }),
});

export type RegisterPayload = z.infer<typeof registerFormSchema>;
