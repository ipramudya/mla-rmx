import { z } from "zod";

export const createOrganizerSchema = z
	.object({
		name: z.string().min(8, { message: "Terlalu pendek" }),
		email: z.string().email({ message: "Email tidak valid" }),
		isLocked: z.boolean().optional(),
		password: z.string().optional().nullable(),
	})
	.superRefine((schema, ctx) => {
		if (schema.isLocked && !schema.password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["password"],
				message: "Tidak boleh kosong",
			});
		}
	});

export type CreateOrganizerPayload = z.infer<typeof createOrganizerSchema>;
